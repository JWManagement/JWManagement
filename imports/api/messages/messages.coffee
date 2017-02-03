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

Messages.schema = new SimpleSchema

	_id:
		type: String
		regEx: SimpleSchema.RegEx.Id
	createdAt:
		type: Date
		denyUpdate: true
	'author.name':
		type: String
	'author.email':
		type: String
		regEx: SimpleSchema.RegEx.Email
	'recipient.name':
		type: String
	'recipient.email':
		type: String
	congregation:
		type: String
	text:
		type: String

Messages.attachSchema = Messages.schema
