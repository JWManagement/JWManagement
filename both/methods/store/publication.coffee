Meteor.methods

	addPublication: (projectId, short) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check short, String

		Projects.update projectId, $addToSet: 'store.items': short: short, languages: []

	updatePublication: (projectId, short, field, value) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check short, String
			check field, String
			check value, String

		set = {}
		set['items.$.' + field] = value

		Projects.update
			'_id': projectId
			'items.short': short
		, $set: set

	removePublication: (projectId, short) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check short, String

		Projects.update projectId, $pull: 'store.items': short: short
