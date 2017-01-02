Meteor.methods

	removeTeamUsers: (users, shiftId, teamId) ->
		teamUsers = []
		shift = Shifts.findOne shiftId, fields:
			'teams._id': 1
			'teams.participants._id': 1
			'teams.pending._id': 1
			'teams.declined._id': 1

		if Meteor.isServer
			check users, Array
			check { shiftId: shiftId, teamId: teamId }, isExistingShiftAndTeam

		if shift?
			for team in shift.teams when team._id == teamId
				allUsers = team.participants.concat(team.pending).concat(team.declined)
				teamUsers = allUsers.map (user) -> user._id if user?

			users.filter (user) -> user._id not in teamUsers
		else
			[]

	openTeam: (shiftId, teamId) ->
		shift = Shifts.findOne shiftId

		if Meteor.isServer
			check { shiftId: shiftId, teamId: teamId }, isExistingShiftAndTeam

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$set:
				status: 'open'
				'teams.$.status': 'open'

	closeTeam: (shiftId, teamId) ->
		shift = Shifts.findOne shiftId
		allClosed = true

		if Meteor.isServer
			check { shiftId: shiftId, teamId: teamId }, isExistingShiftAndTeam

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$set: 'teams.$.status': 'closed'

		for team in shift.teams when team.status == 'open'
			allClosed = false

		if allClosed
			Shifts.update _id: shiftId,
				$set: status: 'closed'

	isTeamleaderInformed: (shiftId, teamId) ->
		teams = Shifts.findOne(shiftId).teams

		for team in teams when team._id == teamId
			for participant in team.participants when participant.thisTeamleader
				if participant.informed then return true

		false

	isTeamInformed: (shiftId, teamId, count) ->
		teams = Shifts.findOne(shiftId).teams
		informed = 0

		for team in teams when team._id == teamId
			for participant in team.participants
				if participant.informed then informed++

		if informed >= count then true else false
