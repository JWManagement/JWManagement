Meteor.publish 'files', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Files.find projectId: projectId
		else
			@ready()
	else
		@ready()
