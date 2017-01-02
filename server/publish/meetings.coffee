Meteor.publish 'meetings', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Projects.find projectId, fields: _id: 1, meetings: 1
		else
			@ready()
	else
		@ready()
