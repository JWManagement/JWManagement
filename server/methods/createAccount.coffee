Meteor.methods

	usernameAvailable: (username) ->
		if Meteor.users.findOne(username: new RegExp('^' + username + '$', 'i'))?
			false
		else
			true

	createAccount: (userObject, projectId) ->
		check userObject, Object
		check { userId: Meteor.userId(), projectId: projectId}, isAdmin

		user = Meteor.users.findOne username: userObject.username, fields: _id: 1

		if user?
			throw new Meteor.Error 500, 'This username is already taken'
		else
			userId = Accounts.createUser userObject

			Meteor.users.update userId, $set: state: 'created'

		userId

	createAccounts: (newUsers, projectId) ->
		check { userId: Meteor.userId(), projectId: projectId}, isAdmin

		tagIds = Projects.findOne(projectId).tags.map((tag) => tag._id)

		if newUsers
			for newUser in newUsers
				userId = Meteor.call 'createAccount',
					username: Random.id 15
					password: ''
					profile:
						email: newUser.email
						firstname: newUser.firstname
						lastname: newUser.lastname
						gender: newUser.gender
						telefon: newUser.telefon
						pioneer: newUser.pioneer
						privilege: newUser.privilege
						congregation: newUser.congregation
						language: newUser.systemLanguage
						languages: newUser.foreignLanguages
				, projectId

				projectPermissionWasSet = false

				if newUser.roles && newUser.roles != '' && newUser.roles.includes('=')
					for roleTarget in newUser.roles.split(';')
						target = roleTarget.split('=')[0]
						role = roleTarget.split('=')[1]

						if target == projectId
							if role in Permissions.member
								Meteor.call 'changeProjectRole', target, userId, role
							else
								Meteor.call 'changeProjectRole', target, userId, 'member'
						else if target in tagIds
							if role in Permissions.participant
								Meteor.call 'changeTagRole', target, userId, role
							else
								Meteor.call 'changeTagRole', target, userId, 'participant'
				else
					Meteor.call 'changeProjectRole', projectId, userId, 'member'

					for tagId in tagIds
						Meteor.call 'changeTagRole', tagId, userId, 'participant'

				if !projectPermissionWasSet
					Meteor.call 'changeProjectRole', projectId, userId, 'member'

