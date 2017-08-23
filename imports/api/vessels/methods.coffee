import SimpleSchema from 'simpl-schema'

export Methods =

	addVessel: new ValidatedMethod
		name: 'Vessels.methods.addVessel'
		validate:
			new SimpleSchema
				projectId:
					type: String
					required: true
				localName: type: String
				flag: type: String
				type:
					type: String
					allowedValues: ['c', 'cr', 'mf', 'mt', 'p', 'pt', 'rc', 'f', 'ro']
				callsign: type: String
				eni: type: String
				imo: type: String
				mmsi: type: String
				lastVisit: type: String
				nextVisit: type: String
				comments: type: String
			.validator()
		run: (newVessel) -> if Meteor.isServer
			{ Vessels } = require '/imports/api/vessels/vessels.coffee'

			project = Projects.findOne(newVessel.projectId, fields: vesselModule: 1, contactPointName: 1)

			newVessel.contactPoint = project.contactPointName

			Vessels.schema.clean newVessel, mutate: true
			Vessels.schema.validate newVessel

			Vessels.insert newVessel
