Meteor.publish 'shiftsHeader.weeks', (projectId, week) ->
	new SimpleSchema
		projectId:
			type: String
			custom: ->
				Validators.project.validId
				Validators.project.isMember
		week: type: String
	.validate { projectId, week }

	# use earliest week
	v1 = parseInt moment().format('YYYYDDDD')
	v2 = parseInt moment(week).format('YYYYDDDD')

	filter =
		projectId: projectId
		start: $gte: moment((v1 + v2) / 2 - Math.abs(v1 - v2) / 2).isoWeekday(1).format('YYYYDDDD')

	Weeks.find(filter || {}).observeChanges
		added: (id, fields) =>
			fields.existing = true

			@added "testdata", id, fields
		changed: (id, fields) ->

			@changed "testdata", id, fields
		removed: (id) -> @removed '', id
