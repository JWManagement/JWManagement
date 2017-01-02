Meteor.methods

	addShiftItem: (shiftId, array, value) ->
		set = {}
		set[array] = value
		shift = Shifts.findOne shiftId, fields: projectId: 1, teams: 1
		project = Projects.findOne shift.projectId, fields: teams: 1, meetings: 1

		if Meteor.isServer
			check shiftId, isExistingShift
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftAdmin

		if array == 'teams'
			if project.teams.length > 0
				teamId = ''
				teamName = ''

				for team in project.teams
					existing = false

					if shift.teams.length > 0
						for shiftTeam in shift.teams
							if team._id == shiftTeam._id
								existing = true

					if !existing
						teamId = team._id
						teamName = team.name
						teamLink = team.link
						teamDescription = team.description

				if teamId != ''
					set[array]['_id'] = teamId
					set[array]['name'] = teamName
					set[array]['link'] = teamLink
					set[array]['description'] = teamDescription
					set[array]['participants'] = []
					set[array]['pending'] = []
					set[array]['declined'] = []
					set[array]['status'] = 'open'
				else
					throw new Meteor.Error 500, 'No possible team left'
			else
				throw new Meteor.Error 404, 'No possible teams found'

		Shifts.update shiftId, $addToSet: set

	updateShiftItem: (shiftId, array, arrayId, field, value) ->
		shift = Shifts.findOne shiftId

		if Meteor.isServer
			check shiftId, isExistingShift
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftAdmin

		find = { _id: shiftId }
		find[array + '._id'] = arrayId

		set = {}
		set[array + '.$.' + field] = value

		if array == 'teams' && field == '_id'
			for team in shift.teams when team._id == value
				throw new Meteor.Error 500, 'No duplicate team allowed'

		Shifts.update find, $set: set

	updateParticipantState: (shiftId, teamId, userId, value) ->
		shift = Shifts.findOne shiftId, fields: teams: 1
		isTeamleader = false
		i = 0
		j = 0

		if Meteor.isServer
			check shiftId, isExistingShift
			check { shiftId: shiftId, teamId: teamId, userId: userId }, isShiftAdminOrThisTeamleader

		for team in shift.teams
			if team._id == teamId
				for participant in team.participants
					if participant._id == userId
						teamIndex = i
						pubIndex = j
					else j++
			else i++

		set = {}
		set['teams.' + teamIndex + '.participants.' + pubIndex + '.state'] = value

		Shifts.update shiftId, $set: set

	setPendingStatus: (shiftId, teamId, userId, value) ->
		shift = Shifts.findOne shiftId
		newPending = {}

		if Meteor.isServer
			check shiftId, isExistingShift
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftAdmin

		for team in shift.teams when team._id == teamId
			newPending = team.pending

			for user in newPending when user._id == userId
				user.checked = value

		Shifts.update _id: shiftId, 'teams._id': teamId,
			$set: 'teams.$.pending': newPending

	removeShiftItem: (shiftId, array, arrayId) ->
		shift = Shifts.findOne shiftId
		pull = {}
		pull[array] = _id: arrayId

		if Meteor.isServer
			check shiftId, isExistingShift
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftAdmin

		Shifts.update shiftId, $pull: pull
