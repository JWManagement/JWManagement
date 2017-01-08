Meteor.methods

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
