Meteor.publish 'settings', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.shiftAdmin, projectId
			[
				Projects.find projectId, fields: wiki: 0, items: 0
			,
				Pictures.find projectId: projectId
			]
		else
			@ready()
	else
		@ready()
