Meteor.publish 'userByToken', (token) ->

	if typeof(token) == 'string' && token != ''
		if token.startsWith('3D')
			console.log('token started with 3D: ' + token)
			token = token.substring(2)

		Meteor.users.find 'services.password.reset.token': token,
			fields: 'profile.firstname': 1, 'profile.lastname': 1, 'services.password.reset.token': 1
	else
		@ready()
