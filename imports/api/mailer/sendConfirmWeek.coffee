import { Shifts } from '/imports/api/shifts/shifts.coffee'

export sendConfirmWeek = (projectId, tagId, weekId) ->
	project = Projects.findOne projectId, fields: name: 1, email: 1
	shifts = Shifts.find
		projectId: projectId
		tagId: tagId
		weekId: weekId

	if shifts?
		for shift in shifts.fetch()
			for team in shift.teams
				for participant in team.participants when !participant.informed
					@sendConfirmation shift._id, team._id, participant._id

				for declinedUser in team.declined when !declinedUser.informed
					@sendDeclined projectId, shift._id, team._id, declinedUser._id

	else
		throw new Meteor.Error 404, 'Shifts with weekId: ' + weekId + ' not found'
