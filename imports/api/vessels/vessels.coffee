import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'

export Vessels = new Mongo.Collection 'vessels'

Vessels.deny
	insert: -> true
	update: -> true
	remove: -> true

Vessels.schemaObj =

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
		dropdown: 'vesselType'
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

schemaObj = {}

for schemaObjKey, schemaObjValue of Vessels.schemaObj
	schemaObj[schemaObjKey] = {}

	for keyAttr, keyValue of schemaObjValue when keyAttr != 'dropdown'
		schemaObj[schemaObjKey][keyAttr] = keyValue

Vessels.schema = new SimpleSchema(schemaObj)

Vessels.attachSchema = Vessels.schema
