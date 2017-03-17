import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'
import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'

export Shifts = new Mongo.Collection 'shifts'

Shifts.methods = Methods
Shifts.helpers = Helpers

Shifts.deny
	insert: -> true
	update: -> true
	remove: -> true

Shifts.schema = new SimpleSchema

	createdAt:
		type: Date
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
		type: Array
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
		type: Array
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
