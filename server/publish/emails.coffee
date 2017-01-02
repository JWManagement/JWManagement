Meteor.publish 'emails', (email) ->

	Meteor.users.find 'profile.email': new RegExp('^' + email.substring(0, 3), 'i'),
		fields: 'profile.firstname': 1, 'profile.lastname': 1, 'profile.email': 1
