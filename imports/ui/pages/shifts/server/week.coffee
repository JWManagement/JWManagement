import { Permissions } from '/imports/api/util/permissions.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'

Meteor.publish 'week', (projectId, week) ->

	if typeof projectId == 'string' && projectId != '' && typeof week == 'string' && week != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Weeks.find projectId: projectId, date: week
		else
			@ready()
	else
		@ready()
