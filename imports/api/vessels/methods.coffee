import SimpleSchema from 'simpl-schema'

import { Validators } from '/imports/api/util/validators.coffee'

export Methods =

	addVessel: new ValidatedMethod
		name: 'Vessels.methods.addVessel'
		validate:
			new SimpleSchema
				projectId:
					type: String
					custom: ->
						Validators.project.validId
				name:
					type: String
				flag:
					type: String
					optional: true
				type:
					type: String
					allowedValues: ['c', 'cr', 'mf', 'mt', 'p', 'pt', 'rc', 'f', 'ro']
				callsign:
					type: String
					optional: true
				eni:
					type: String
					optional: true
				imo:
					type: String
					optional: true
				mmsi:
					type: String
					optional: true
				lastVisit:
					type: String
					optional: true
				nextVisit:
					type: String
					optional: true
				languages:
					type: String
					optional: true
			.validator()
		run: (newVessel) -> if Meteor.isServer
			{ Vessels } = require '/imports/api/vessels/vessels.coffee'

			project = Projects.findOne(newVessel.projectId, fields: vesselModule: 1, harborGroup: 1)

			newVessel.harborGroup = project.harborGroup

			Vessels.schema.clean newVessel, mutate: true
			Vessels.schema.validate newVessel

			Vessels.insert newVessel

Meteor.methods

	validateVesselInput: (args) ->

		{ Vessels } = require '/imports/api/vessels/vessels.coffee'

		if args.name.length == 0
			throw new Meteor.Error 'validation-error', 'nameRequired'

		if Vessels.findOne(callsign: args.callsign)
			throw new Meteor.Error 'validation-error', 'callsignUnique'

		if Vessels.findOne(eni: args.eni)
			throw new Meteor.Error 'validation-error', 'eniUnique'

		if Vessels.findOne(imo: args.imo)
			throw new Meteor.Error 'validation-error', 'imoUnique'

		if Vessels.findOne(mmsi: args.mmsi)
			throw new Meteor.Error 'validation-error', 'mmsiUnique'
