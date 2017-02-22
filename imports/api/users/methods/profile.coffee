import SimpleSchema from 'simpl-schema'

import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { SendMail } from '/imports/api/mailer/import.coffee'
import { Validators } from '/imports/util/validators.coffee'
import { StringUtils } from '/imports/util/stringUtils.coffee'

export ProfileMethods =

	update: new ValidatedMethod
		name: 'Meteor.users.methods.profile.update'
		validate:
			new SimpleSchema
				field:
					type: String
					allowedValues: [
						'username'
						'firstname'
						'lastname'
						'email'
						'telefon'
						'congregation'
						'language'
						'languages'
						'gender'
						'bdate'
						'pioneer'
						'privilege'
					]
				value: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			field = args.field
			value = args.value
			set = {}

			if field == 'username'
				value = value.toLowerCase()
				value = StringUtils.trim value
				value = StringUtils.removeSpecials value

				if (Meteor.users.findOne username: value)?
					throw new Meteor.Error 'usernameUnavailable', 'error'
			else if field == 'firstname' || field == 'lastname'
				value = StringUtils.trim value
				value = StringUtils.capitalize value
			else if field == 'email'
				value = value.toLowerCase()
				value = StringUtils.trim value
			else if field == 'telefon'
				value = StringUtils.trim value
				value = StringUtils.removeLetters value
			else if field == 'congregation'
				value = StringUtils.trim value
			else if field == 'languages'
				value = StringUtils.trim value

			if field == 'username'
				set[field] = value
			else
				set['profile.' + field] = value

			Meteor.users.update Meteor.userId(), $set: set

			if field in ['firstname', 'lastname', 'email', 'telefon']
				if field == 'firstname' || field == 'lastname'
					user = Meteor.users.findOne Meteor.userId(),
						fields:
							'profile.firstname': 1
							'profile.lastname': 1

					if user?
						field = 'name'
						value = user.profile.firstname + ' ' + user.profile.lastname

				allMyShifts = Shifts.find 'teams.participants._id': Meteor.userId(),
					fields:
						'teams._id': 1
						'teams.participants': 1
						'teams.pending': 1
						'teams.declined': 1

				for shift in allMyShifts.fetch()
					for team in shift.teams
						newParticipants = []
						newPending = []
						newDeclined = []
						updateParticipants = false
						updatePending = false
						updateDeclined = false
						setTeam = {}

						for array in ['participants', 'pending', 'declined']
							if team[array].filter((user) -> user._id == Meteor.userId()).length > 0
								setTeam['teams.$.' + array] = team[array].map (user) ->
									user[field] = value if user._id == Meteor.userId()

						if setTeam != {}
							Shifts.update _id: shift._id, 'teams._id': team._id,
								$set: setTeam

	password:

		getResetToken: new ValidatedMethod
			name: 'Meteor.users.methods.profile.password.getResetToken'
			validate:
				new SimpleSchema
					email: type: String
					username:
						type: String
						optional: true
				.validator()
			run: (args) -> if Meteor.isServer
				if SendMail.sendResetPassword args
					throw new Meteor.Error 'mailSuccessfullySent', 'success'

		reset: new ValidatedMethod
			name: 'Meteor.users.methods.profile.password.reset'
			validate:
				new SimpleSchema
					token: type: String
					password: type: String
				.validator()
			run: (args) -> if Meteor.isServer
				user = Meteor.users.findOne 'services.password.reset.token': args.token,
					fields: username: 1

				if user?
					Meteor.users.update user._id, $unset: 'services.password.reset': 1

					Accounts.setPassword user._id, args.password

					user.username
				else
					throw new Meteor.Error 'invalidToken', 'error'
