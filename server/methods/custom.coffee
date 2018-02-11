import Vessels from '/imports/api/vessels/vessels.js'

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

	setVesselId: -> if Meteor.isServer
		console.log 'setVesselId'

		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			vessels = Vessels.find().fetch()

			i = 0
			j = 0
			compare = Math.round(vessels.length / 10)

			for vessel in vessels
				Vessels.update vessel._id, $set: harborGroup: 'Service Department'
				i++

				if i % compare == 0
					j++
					console.log j + ' / 10'

			console.log 'done'
		else
			console.log 'no permission'
