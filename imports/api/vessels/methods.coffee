import SimpleSchema from 'simpl-schema'

import { Validators } from '/imports/api/util/validators.coffee'
import { Vessels } from '/imports/api/vessels/vessels.coffee'

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

			Meteor.call 'validateVesselInput',
				name: newVessel.name
				callsign: newVessel.callsign
				eni: newVessel.eni
				imo: newVessel.imo
				mmsi: newVessel.mmsi
			, (e1) ->
				if e1
					console.log 'ERROR editVessel ERROR'
					console.log e1
				else
					Vessels.insert newVessel

	editVessel: new ValidatedMethod
		name: 'Vessels.methods.editVessel'
		validate:
			new SimpleSchema
				_id:
					type: String
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

			Meteor.call 'validateVesselInput',
				_id: newVessel._id
				name: newVessel.name
				callsign: newVessel.callsign
				eni: newVessel.eni
				imo: newVessel.imo
				mmsi: newVessel.mmsi
			, (e1) ->
				if e1
					console.log 'ERROR editVessel ERROR'
					console.log e1
				else
					set = {}

					for key in Object.keys(newVessel) when key in ['name', 'flag', 'type', 'callsign', 'eni', 'imo', 'mmsi', 'lastVisit', 'nextVisit', 'languages']
						set[key] = newVessel[key]

					Vessels.update newVessel._id, $set: set

Meteor.methods

	validateVesselInput: (args) ->

		{ Vessels } = require '/imports/api/vessels/vessels.coffee'

		if args.name.length == 0
			throw new Meteor.Error 'validation-error', 'nameRequired'

		if typeof args.callsign == 'string' && args.callsign.length > 0
			vessel = Vessels.findOne(callsign: args.callsign)

			if (args._id? && args.callsign != vessel.callsign) || (!args._id? && vessel?)
				throw new Meteor.Error 'validation-error', 'callsignUnique'

		if typeof args.eni == 'string' && args.eni.length > 0
			vessel = Vessels.findOne(eni: args.eni)

			if (args._id? && args.eni != vessel.eni) || (!args._id? && vessel?)
				throw new Meteor.Error 'validation-error', 'eniUnique'

		if typeof args.imo == 'string' && args.imo.length > 0
			vessel = Vessels.findOne(imo: args.imo)

			if (args._id? && args.imo != vessel.imo) || (!args._id? && vessel?)
				throw new Meteor.Error 'validation-error', 'imoUnique'

		if typeof args.mmsi == 'string' && args.mmsi.length > 0
			vessel = Vessels.findOne(mmsi: args.mmsi)

			if (args._id? && args.mmsi != vessel.mmsi) || (!args._id? && vessel?)
				throw new Meteor.Error 'validation-error', 'mmsiUnique'
