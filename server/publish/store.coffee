Meteor.publish 'store', (projectId) ->

	if typeof projectId == 'string' && projectId != ''
		if Roles.userIsInRole @userId, Permissions.storeAdmin, projectId
			Projects.find projectId, fields: store: 1
		else if Roles.userIsInRole @userId, Permissions.member, projectId
			Projects.find projectId, fields:
				'store.items.name': 1
				'store.items.short': 1
				'store.items.languages.long': 1
				'store.items.languages.short': 1
		else
			@ready()
	else
		@ready()
