Meteor.publish 'usersByProject', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.shiftAdmin, projectId
			Roles.getUsersInRole Permissions.member, projectId, fields:
				username: 1
				profile: 1
				roles: 1
				state: 1
		else
			@ready()
	else
		@ready()
