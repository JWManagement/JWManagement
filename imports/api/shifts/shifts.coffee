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

Shifts.attachSchema = Shifts.schema
