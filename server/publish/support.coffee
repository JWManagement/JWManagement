Meteor.publish 'support', ->

	if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
		[
			Projects.find {},
				fields: name: 1
				sort: name: 1
		,
			Meteor.users.find {},
				fields:
					username: 1
					'profile.firstname': 1
					'profile.lastname': 1
				sort:
					'profile.lastname': 1
					'profile.firstname': 1
		]
	else
		@ready()
