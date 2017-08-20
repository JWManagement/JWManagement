import SimpleSchema from 'simpl-schema'

export Vessels =

	addVessel: new ValidatedMethod
		name: 'Vessels.methods.addVessel'
		validate:
			new SimpleSchema
				name: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			console.log 'yippie'
