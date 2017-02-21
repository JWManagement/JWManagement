Meteor.methods

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

	createAccounts: (newUsers, existingUsers, projectId) ->
		check newUsers, Array
		check existingUsers, Array
		check { userId: Meteor.userId(), projectId: projectId}, isAdmin

		for newUser in newUsers
			user =
				username: Random.id 5
				password: ''
				profile: newUser

			Meteor.call 'createAccount', user, projectId

		for existingUser in existingUsers
			user = Meteor.users.find({'profile.email': existingUser.email}, {fields: _id: 1}).fetch()[0]

			if !Roles.userIsInRole user._id, Permissions.member, projectId
				Meteor.call 'changeProjectRole', projectId, user._id, 'member'

				project = Projects.findOne projectId, fields: 'tags._id': 1
				for tag in project.tags
					Meteor.call 'changeTagRole', tag._id, user._id, 'participant'

				Meteor.call 'sendJoinProject', projectId, user._id
