Meteor.methods

	changeAllShiftTags: (projectId, tagId, tagName) ->
		minDate = parseInt(moment(new Date()).format('YYYYDDDD'))

		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		Meteor.call 'updateProjectItem', projectId, 'tags', tagId, 'name', tagName

		Shifts.update
			projectId: projectId
			tagId: tagId
		,
			$set: tag: tagName
		,
			multi: true

	changeAllShiftTeams: (projectId, teamId, field, value) ->
		minDate = parseInt(moment(new Date()).format('YYYYDDDD'))
		set = {}
		set['teams.$.' + field] = value

		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		Meteor.call 'updateProjectItem', projectId, 'teams', teamId, field, value

		Shifts.update
			projectId: projectId
			'teams._id': teamId
		,
			$set: set
		,
			multi: true

	changeAllShiftMeetings: (projectId, meetingId, field, value) ->
		minDate = parseInt(moment(new Date()).format('YYYYDDDD'))

		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		Meteor.call 'updateProjectItem', projectId, 'meetings', meetingId, field, value, (e) ->
			if e then throw new Meteor.Error 500, e.reason

		shifts = Shifts.find
			projectId: projectId
			$or: [
				'teams.meetingStart._id': meetingId
			,
				'teams.meetingEnd._id': meetingId
			,
				'place': meetingId
			]

		for shift in shifts.fetch()
			for team in shift.teams
				if team.meetingStart? && team.meetingStart._id == meetingId
					Meteor.call 'updateShiftItem', shift._id, 'teams', team._id, 'meetingStart.' + field, value

				if team.meetingEnd? && team.meetingEnd._id == meetingId
					Meteor.call 'updateShiftItem', shift._id, 'teams', team._id, 'meetingEnd.' + field, value

				if team.place? && team.place._id == meetingId
					Meteor.call 'updateShiftItem', shift._id, 'teams', team._id, 'place.' + field, value
