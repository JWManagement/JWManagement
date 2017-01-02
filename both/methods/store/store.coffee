Meteor.methods

	initStore: (projectId, value) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check value, String
			check value, Match.Where (value) -> value in ['simple', 'advanced']

		set = {}
		set['store.mode'] = value
		set['store.items'] = []

		Projects.update projectId, $set: set

	resetStore: (projectId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin

		Projects.update projectId, $unset: 'store': 1
