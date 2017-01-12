Meteor.publish 'support', ->

	if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
		Projects.find {},
			fields: name: 1
			sort: name: 1
	else
		@ready()
