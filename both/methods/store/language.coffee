Meteor.methods

	addLanguage: (projectId, short, language, stock) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check short, String
			check language, String
			check stock, Match.Integer

		existing = false
		project = Projects.findOne projectId, fields: 'store.items': 1
		for item in project.store.items when item.short == short
			for lang in item.languages when lang.short == language
				existing = true

		if existing
			Meteor.call 'updateLanguage', projectId, short, language, stock
			throw new Meteor.Error 200, 'Language already existed. Therefore set new stock for the existing one.'
		else
			Projects.update _id: projectId, 'store.items.short': short,
				$addToSet: 'store.items.$.languages':
					short: language
					stock: stock

	updateLanguage: (projectId, short, language, stock) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check short, String
			check language, String
			check stock, Match.Integer

		Projects.update _id: projectId, 'store.items.short': short,
			$pull: 'store.items.$.languages': short: language

		Projects.update _id: projectId, 'store.items.short': short,
			$addToSet: 'store.items.$.languages':
				short: language
				stock: stock

	removeLanguage: (projectId, short, language) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isStoreAdmin
			check short, String

		Projects.update
			_id: projectId
			'items.short': short
		,
			$pull: 'store.items.$.languages': short: language
