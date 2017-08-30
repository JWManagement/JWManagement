Meteor.methods

	createProject: (args) ->
		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			newProject =
				_id: args.projectId
				name: args.projectName
				email: args.email
				language: args.language
				news: {}
				wiki: tabs: []
				tags: []
				teams: []
				meetings: []
				store: {}

			Projects.insert(newProject)
