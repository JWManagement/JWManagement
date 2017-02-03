import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'
import { Mongo } from 'meteor/mongo'

export Messages = new Mongo.Collection 'messages'

Messages.methods = Methods
Messages.helpers = Helpers

Messages.deny
	insert: -> true
	update: -> true
	remove: -> true

Messages.attachSchema = new SimpleSchema

	_id:
		type: String
		regEx:  SimpleSchema.RegEx.Id
	createdAt:
		type: Date
		denyUpdate: true
