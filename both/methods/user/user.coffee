Meteor.methods

	updateProfile: (field, value) ->
		check field, String
		check value, String

		set = {}

		if field == 'username'
			value = value.toLowerCase()
			value = Validations.trim value
			value = Validations.removeSpecials value

			if (Meteor.users.findOne username: value)?
				throw new Meteor.Error 406, 'Username unavailable'
		else if field == 'firstname' || field == 'lastname'
			value = Validations.trim value
			value = Validations.capitalize value
		else if field == 'email'
			value = value.toLowerCase()
			value = Validations.trim value
		else if field == 'telefon'
			value = Validations.trim value
			value = Validations.removeLetters value
		else if field == 'congregation'
			value = Validations.trim value
		else if field == 'languages'
			value = Validations.trim value

		if field != 'username'
			field = 'profile.' + field

		set[field] = value
		Meteor.users.update Meteor.userId(), $set: set

		if Meteor.isServer
			set[field] = value
			Meteor.users.update Meteor.userId(), $set: set

			if field == 'profile.firstname'
				user = Meteor.users.findOne Meteor.userId(), fields: 'profile.lastname': 1

				if user?
					field = 'name'
					value = value + ' ' + user.profile.lastname
			else if field == 'profile.lastname'
				user = Meteor.users.findOne Meteor.userId(), fields: 'profile.firstname': 1

				if user?
					field = 'name'
					value = user.profile.firstname + ' ' + value
			else if field == 'profile.telefon'
				field = 'telefon'
			else if field == 'profile.email'
				field = 'email'
			else
				return

			allMyShifts = Shifts.find 'teams.participants._id': Meteor.userId(),
				fields: 'teams._id': 1, 'teams.participants': 1, 'teams.pending': 1, 'teams.declined': 1

			for shift in allMyShifts.fetch()
				for team in shift.teams
					newParticipants = []
					newPending = []
					newDeclined = []
					updateParticipants = false
					updatePending = false
					updateDeclined = false
					setTeam = {}

					for user in team.participants when user._id == Meteor.userId()
						updateParticipants = true
						break
					for user in team.pending when user._id == Meteor.userId()
						updatePending = true
						break
					for user in team.declined when user._id == Meteor.userId()
						updateDeclined = true
						break

					if updateParticipants
						newParticipants = team.participants
						for user in newParticipants when user._id == Meteor.userId()
							user[field] = value

						setTeam['teams.$.participants'] = newParticipants
					if updatePending
						newPending = team.pending
						for user in newPending when user._id == Meteor.userId()
							user[field] = value

						setTeam['teams.$.pending'] = newPending
					if updateDeclined
						newDeclined = team.declined
						for user in newDeclined when user._id == Meteor.userId()
							user[field] = value

						setTeam['teams.$.declined'] = newDeclined

					if setTeam != {}
						Shifts.update shiftId, 'teams._id': team._id,
							$set: setTeam

	toggleAvailability: (day, hour) ->
		check day, String
		check hour, Number

		user = Meteor.users.findOne Meteor.userId(), fields: 'profile.available': 1

		if !user.profile.available? || Object.keys(user.profile.available).length == 0
			user.profile.available = mo: [], tu: [], we: [], th: [], fr: [], sa: [], su: []
			Meteor.users.update Meteor.userId(), $set: 'profile.available': user.profile.available

		if hour in user.profile.available[day]
			pull = {}
			pull['profile.available.'+ day] = hour

			Meteor.users.update Meteor.userId(), $pull: pull
		else
			add = {}
			add['profile.available.'+ day] = hour

			Meteor.users.update Meteor.userId(), $addToSet: add

	setState: (projectId, userId, state) ->
		if Roles.userIsInRole Meteor.userId(), 'admin', projectId
			validStates = ['created', 'invited', 'active']

			if state in validStates
				Meteor.users.update userId, $set: state: state
			else
				throw new Meteor.Error 500, 'State ' + state + ' invalid'
		else
			throw new Meteor.Error 500, 'Insufficient permissions'
