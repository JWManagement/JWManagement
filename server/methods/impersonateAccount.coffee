Meteor.methods

	getImpersonateToken: (userId) ->
		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			token = Random.secret()

			Meteor.users.update userId, $set: 'services.impersonate.token': token

			token

Accounts.registerLoginHandler 'impersonate', (options) ->

	if options.impToken && typeof options.impToken == 'string'
		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			user = Meteor.users.findOne 'services.impersonate.token': options.impToken

			if user
				Meteor.users.update user._id, $unset: 'services.impersonate': 1

				userId: user._id
			else
				throw new Meteor.Error 403, 'Invalid Token'
