import { Files } from '/imports/api/files/files.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'

Meteor.publish 'files', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Files.find projectId: projectId
		else
			@ready()
	else
		@ready()
