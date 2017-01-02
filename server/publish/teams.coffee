Meteor.publish 'teams', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.member, projectId
			Projects.find projectId, fields: _id: 1, teams: 1
		else
			@ready()
	else
		@ready()
