Meteor.methods

	usernameAvailable: (username) -> if Meteor.users.findOne(username: username)? then false else true

	createAccount: (userObject, projectId) ->
		check userObject, Object
		check { userId: Meteor.userId(), projectId: projectId}, isAdmin

		user = Meteor.users.findOne username: userObject.username, fields: _id: 1

		if user?
			throw new Meteor.Error 500, 'This username is already taken'
		else
			userId = Accounts.createUser userObject

			if userId
				Meteor.call 'changeProjectRole', projectId, userId, 'member'

				project = Projects.findOne projectId, fields: 'tags._id': 1
				for tag in project.tags
					Meteor.call 'changeTagRole', tag._id, userId, 'participant'

				Meteor.users.update userId, $set: state: 'created'

	createAccounts: (newUsers, projectId) ->
		console.log(newUsers)

		check newUsers, Array
		check { userId: Meteor.userId(), projectId: projectId}, isAdmin

		for newUser in newUsers
			Meteor.call 'createAccount',
				username: Random.id 5
				password: ''
				profile: newUser
			, projectId
