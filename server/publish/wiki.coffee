Meteor.publish 'wiki', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Projects.find projectId, fields: wiki: 1
		else
			@ready()
	else
		@ready()
