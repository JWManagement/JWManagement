Meteor.methods

	addItem: (projectId, type, short, name) ->
		if Roles.userIsInRole Meteor.userId(), Permissions.storeAdmin, projectId
			Projects.update projectId, $addToSet: items:
				type: type
				short: short
				name: name
				languages: []
		else
			throw new Meteor.Error 500, 'Insufficient permissions'

	updateItem: (projectId, itemShort, field, value) ->
		if Roles.userIsInRole Meteor.userId(), Permissions.storeAdmin, projectId
			set = {}
			set['items.$.' + field] = value

			Projects.update
				'_id': projectId
				'items.short': itemShort
			, $set: set
		else
			throw new Meteor.Error 500, 'Insufficient permissions'

	removeItem: (projectId, itemShort) ->
		if Roles.userIsInRole Meteor.userId(), Permissions.storeAdmin, projectId
			Projects.update projectId, $pull:
				items: short: itemShort
		else
			throw new Meteor.Error 500, 'Insufficient permissions'
