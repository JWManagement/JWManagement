import SimpleSchema from 'simpl-schema'

export AvailabilityMethods =

	toggle: new ValidatedMethod
		name: 'Meteor.users.methods.availability.toggle'
		validate:
			new SimpleSchema
				day: type: String
				hour: type: Number
			.validator()
		run: (args) -> if Meteor.isServer
			day = args.day
			hour = args.hour
			user = Meteor.users.findOne Meteor.userId(), fields: 'profile.available': 1

			if !user.profile.available? || Object.keys(user.profile.available).length == 0
				Meteor.users.update Meteor.userId(),
					$set: 'profile.available': mo: [], tu: [], we: [], th: [], fr: [], sa: [], su: []

			update = {}
			update['profile.available.' + day] = hour

			if hour in user.profile.available[day]
				Meteor.users.update Meteor.userId(), $pull: update
			else
				Meteor.users.update Meteor.userId(), $addToSet: update

	update: new ValidatedMethod
		name: 'Meteor.users.methods.availability.update'
		validate:
			new SimpleSchema
				field:
					type: String
					allowedValues: ['shortTermCalls', 'shortTermCallsAlways']
				value: type: Boolean
			.validator()
		run: (args) -> if Meteor.isServer
			set = {}
			set['profile.' + args.field] = args.value

			Meteor.users.update Meteor.userId(), $set: set
