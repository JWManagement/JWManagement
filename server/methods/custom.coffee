Meteor.methods

	setProjectUsersProfile: (projectId) -> if Meteor.isServer
		console.log 'setProjectUsersProfile'

		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			users = Roles.getUsersInRole Permissions.member, projectId

			for user in users.fetch()
				console.log user.username

				Meteor.users.update user._id, $set: 'profile.shortTermCalls': true

			console.log 'done'
		else
			console.log 'no permission'
