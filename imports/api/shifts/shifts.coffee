import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'
import { Mongo } from 'meteor/mongo'

export Shifts = new Mongo.Collection 'shifts'

Shifts.methods = Methods
Shifts.helpers = Helpers

Shifts.deny
	insert: -> true
	update: -> true
	remove: -> true

Shifts.schema = new SimpleSchema

	_id:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoValue: -> Random.id()
	createdAt:
		type: Date
		denyUpdate: true
		autoValue: -> new Date
	projectId:
		type: String
	weekId:
		type: String
	date:
		type: Number
	start:
		type: Number
	end:
		type: Number
	tag:
		type: String
	tagId:
		type: String
	status:
		type: String
		autoValue: -> 'open'
	scheduling:
		type: String
		autoValue: -> 'direct'
	teams:
		type: [Object]
		minCount: 1
	'teams.$._id':
		type: String
	'teams.$.name':
		type: String
	'teams.$.min':
		type: String
	'teams.$.max':
		type: String
	'teams.$.meetingStart':
		type: String
	'teams.$.meetingEnd':
		type: String
	'teams.$.participants':
		type: [Object]
		minCount: 0
	'teams.$.participants.$.teamleader':
		type: String
	'teams.$.participants.$.substituteTeamleader':
		type: String
	'teams.$.participants.$.thisTeamleader':
		type: String
	'teams.$.participants.$.phone':
		type: String
	'teams.$.participants.$.email':
		type: String
	'teams.$.participants.$.state':
		type: String

Shifts.attachSchema = Shifts.schema
