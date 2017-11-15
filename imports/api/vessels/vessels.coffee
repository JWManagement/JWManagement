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
		autoValue: -> Random.id() unless @isSet
	createdAt:
		type: Date
		autoValue: -> new Date
	createdBy:
		type: String
		autoValue: -> Meteor.userId()
	name:
		type: String
	flag:
		type: String
		optional: true
	type:
		type: String
		allowedValues: ['c', 'cr', 'mf', 'mt', 'p', 'pt', 'rc', 'f', 'ro', 't', 'unknown']
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
	harborGroup:
		type: String
	nextVisit:
		type: String
		optional: true
	languages:
		type: String
		optional: true
	comments:
		type: String
		optional: true

Vessels.attachSchema = Vessels.schema

Vessels.methods = Methods
Vessels.helpers = Helpers
