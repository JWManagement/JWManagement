import SimpleSchema from 'simpl-schema'

export Getters =

	usernameAvailable: new ValidatedMethod
		name: 'Meteor.users.methods.getters.usernameAvailable'
		validate:
			new SimpleSchema
				username: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			!Meteor.users.findOne(username: args.username)?

	getUsernamesForEmail: new ValidatedMethod
		name: 'Meteor.users.methods.getters.getUsernamesForEmail'
		validate:
			new SimpleSchema
				email: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			users = Meteor.users.find 'profile.email': args.email,
				fields:
					'username': 1
					'profile.firstname': 1
					'profile.lastname': 1

			users.fetch().map (user) ->
				_id: user._id
				username: user.username,
				name: user.profile.firstname + ' ' + user.profile.lastname
