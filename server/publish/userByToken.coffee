Meteor.publish 'userByToken', (token) ->

	if typeof(token) == 'string' && token != ''
		Meteor.users.find 'services.password.reset.token': token,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'services.password.reset.token': 1
	else
		@ready()
