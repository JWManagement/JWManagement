import SimpleSchema from 'simpl-schema'

export Methods =

	addVessel: new ValidatedMethod
		name: 'Vessels.methods.addVessel'
		validate:
			new SimpleSchema
				projectId: type: String
				localName: type: String
				flag: type: String
				type: type: String
				callsign: type: String
				eni: type: String
				imo: type: String
				mmsi: type: String
				lastVisit: type: String
				nextVisit: type: String
			.validator()
		run: (newVessel) -> if Meteor.isServer
			{ Vessels } = require '/imports/api/vessels/vessels.coffee'

			Vessels.schema.clean newVessel, mutate: true
			Vessels.schema.validate newVessel

			Vessels.insert newVessel
