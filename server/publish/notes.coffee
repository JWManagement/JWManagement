Meteor.publish 'notes', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
			Projects.find projectId, fields: notes: 1
		else
			@ready()
	else
		@ready()
