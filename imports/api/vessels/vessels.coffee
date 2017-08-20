import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'

import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'

export Vessels = new Mongo.Collection 'vessels'

Vessels.deny
	insert: -> true
	update: -> true
	remove: -> true

Vessels.schema = new SimpleSchema

	_id:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoValue: -> Random.id()
	createdAt:
		type: Date
		autoValue: -> new Date
	createdBy:
		type: String
		regEx: SimpleSchema.RegEx.Id
	localName:
		type: String
	flag:
		type: String
	type:
		type: String
	callsign:
		type: String
	eni:
		type: String
	emo:
		type: String
	mmsi:
		type: String
	lastVisit:
		type: Date
		autoValue: -> new Date
	contactPoint:
		type: String
	nextVisit:
		type: Date

Vessels.attachSchema = Vessels.schema

Vessels.methods = Methods
Vessels.helpers = Helpers
