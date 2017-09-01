import { Vessels } from '/imports/api/vessels/vessels.coffee'

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

			for vessel in vessels
				oldId = vessel._id
				vessel._id = vessel._id._str

				Vessels.insert vessel
				Vessels.remove oldId

			console.log 'done'
		else
			console.log 'no permission'
