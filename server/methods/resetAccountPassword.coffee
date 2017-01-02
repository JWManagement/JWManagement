Meteor.methods

	resetAccountPassword: (token, password) ->
		check token, String
		check password, String

		user = Meteor.users.findOne 'services.password.reset.token': token,
			fields: username: 1

		if user?
			Meteor.users.update user._id, $unset: 'services.password.reset': 1

			Accounts.setPassword user._id, password

			user.username
		else
			throw new Meteor.Error 409, 'Invalid token'

	getUsernamesForEmail: (email) ->
		check email, String

		if email != ''
			Meteor.users.find('profile.email': email,
				fields:
					'username': 1
					'profile.firstname': 1
					'profile.lastname': 1
			).fetch().map (user) ->
				_id: user._id, username: user.username, name: user.profile.firstname + ' ' + user.profile.lastname
