import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/util/permissions.coffee'

Meteor.publish 'wiki', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Projects.find projectId, fields:
				'wiki.tabs._id': 1
				'wiki.tabs.title': 1
		else
			@ready()
	else
		@ready()
