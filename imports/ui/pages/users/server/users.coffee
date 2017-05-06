import { Permissions } from '/imports/api/util/permissions.coffee'

Meteor.publish 'users.users', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.shiftScheduler, projectId
			Roles.getUsersInRole Permissions.member, projectId, fields:
				username: 1
				profile: 1
				roles: 1
				state: 1
		else
			@ready()
	else
		@ready()
