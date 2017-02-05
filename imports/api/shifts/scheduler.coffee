import { Shifts } from './shifts.coffee'

export Scheduler =

	getUser: (userId, tagId) ->
		user = Meteor.users.findOne userId

		_id: userId
		name: user.profile.firstname + ' ' + user.profile.lastname
		teamleader: Roles.userIsInRole userId, 'teamleader', tagId
		substituteTeamleader: Roles.userIsInRole userId, 'substituteTeamleader', tagId
		phone: user.profile.telefon
		email: user.profile.email

	getParticipant: (userId, tagId, isThisTeamleader) ->
		user = @getUser userId, tagId
		user.thisTeamleader = isThisTeamleader
		user

	getRequester: (userId, tagId, isChecked) ->
		user = @getUser userId, tagId
		user.checked = isChecked
		user

	addParticipant: (shiftId, teamId, userId, isThisTeamleader) ->
		shift = Shifts.findOne shiftId, fields: tagId: 1
		user = @getParticipant userId, shift.tagId, isThisTeamleader

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$pull:
				'teams.$.pending': _id: userId
				'teams.$.declined': _id: userId
			$addToSet: 'teams.$.participants': user

	addRequest: (shiftId, teamId, userId, isChecked) ->
		shift = Shifts.findOne shiftId, fields: tagId: 1

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$pull:
				'teams.$.participants': _id: userId
				'teams.$.declined': _id: userId
			$addToSet: 'teams.$.pending': @getRequester userId, shift.tagId, isChecked

	addDeclined: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId, fields: tagId: 1

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$pull:
				'teams.$.participants': _id: userId
				'teams.$.pending': _id: userId
			$addToSet: 'teams.$.declined': @getUser userId, shift.tagId

	openTeam: (shiftId, teamId) ->
		shift = Shifts.findOne shiftId

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$set:
				status: 'open'
				'teams.$.status': 'open'

	closeTeam: (shiftId, teamId) ->
		shift = Shifts.findOne shiftId

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$set: 'teams.$.status': 'closed'

		if shift.teams.filter((team) -> team.status == 'open' && team._id != teamId).length == 0
			Shifts.update shiftId, $set: status: 'closed'

	getBestTeamleader: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId
		chosenId = false

		for team in shift.teams when team._id == teamId
			allUsers = team.pending.concat(team.participants).filter (user) -> user.teamleader || user.substituteTeamleader
			allUsers.push @getParticipant userId, false

			for user in allUsers
				hasTeamleader = true

				if !chosenId?
					if user.teamleader
						return user._id
					else if user.substituteTeamleader
						chosenId = user._id
						chosenIsTeamleader = false
				else if !chosenIsTeamleader && user.teamleader
					return user._id

		if chosenId then chosenId else false

	setTeamleader: (userId) ->
		Shifts.update _id: shiftId, 'teams._id': teamId,
			$pull: 'teams.$.participants': _id: userId

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$addToSet: 'teams.$.participants': @getParticipant userId, true
