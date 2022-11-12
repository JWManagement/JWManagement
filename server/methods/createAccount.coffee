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
			if Meteor.users.findOne userObject.id, fields: _id: 1
				Meteor.users.update userObject.id, {
					$set: {
						profile: userObject.profile
					}
				}
				userObject.id
			else
				userId = Accounts.createUser userObject
				Meteor.users.update userId, $set: state: 'created'
				userId

	createAccounts: (users, projectId) ->
		check { userId: Meteor.userId(), projectId: projectId}, isAdmin

		tagIds = Projects.findOne(projectId).tags.map((tag) => tag._id)

		if users
			for user in users
				userId = Meteor.call 'createAccount',
					id: user.id
					username: Random.id 15
					password: ''
					profile:
						email: user.email
						firstname: user.firstname
						lastname: user.lastname
						gender: user.gender
						telefon: user.telefon
						pioneer: user.pioneer
						privilege: user.privilege
						congregation: user.congregation
						language: user.systemLanguage
						languages: user.foreignLanguages
				, projectId

				projectPermissionWasSet = false

				if userId != Meteor.userId() && user.roles && user.roles != '' && user.roles.includes('=')
					for roleTarget in user.roles.split(';')
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

