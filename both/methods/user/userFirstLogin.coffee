Meteor.methods
	userFirstLogin: (token, username, password) ->
		user = Meteor.users.findOne 'services.password.reset.token': token,
			fields: _id: 1

		if user?
			Accounts.setPassword user._id, password
			Accounts.setUsername user._id, username
			Meteor.users.update user._id, $set: state: 'active'
			true
		else
			false
