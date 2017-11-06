import SimpleSchema from 'simpl-schema'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { Validators } from '/imports/api/util/validators.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'

Meteor.publish 'shifts.weeks', (projectId, week) ->
	new SimpleSchema
		projectId:
			type: String
			custom: ->
				Validators.project.validId
				Validators.project.isMember
		week: type: String
		# TODO: check if it contains W at 5. position
	.validate { projectId, week }

	v1 = parseInt moment().format('YYYYDDDD')
	v2 = parseInt moment(week).format('YYYYDDDD')
	earliestWeek = (v1 + v2) / 2 - Math.abs(v1 - v2) / 2

	filter = projectId: projectId

	if Roles.userIsInRole @userId, Permissions.shiftScheduler, projectId
		start: $gte: parseInt moment(earliestWeek, 'YYYYDDDD').isoWeekday(1).format('YYYYDDDD')

	handle = Weeks.find(filter).observeChanges
		added: (id, doc) =>
			newDoc =
				_id: id
				projectId: doc.projectId
				date: doc.date
				start: doc.start

			if doc.date == week
				newDoc.days = doc.days

			@added 'weeks', id, newDoc
		changed: (id, doc) =>
			newDoc =
				_id: id
				projectId: doc.projectId
				date: doc.date
				start: doc.start

			if doc.date == week
				newDoc.days = doc.days

			@changed 'weeks', id, newDoc
		removed: (id) => @removed 'weeks', id

	@ready()

	@onStop -> handle.stop()
