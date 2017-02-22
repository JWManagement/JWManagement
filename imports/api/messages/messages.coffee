import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'
import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'

export Messages = new Mongo.Collection 'messages'

Messages.methods = Methods
Messages.helpers = Helpers

Messages.deny
	insert: -> true
	update: -> true
	remove: -> true

Messages.schema = new SimpleSchema

	createdAt:
		type: Date
		autoValue: -> new Date
	type:
		type: String
		allowedValues: ['enquiry']
		autoValue: -> 'enquiry'
	language:
		type: String
		autoValue: -> 'de'
	'author.name':
		type: String
	'author.email':
		type: String
		regEx: SimpleSchema.RegEx.Email
	'recipient.name':
		type: String
		autoValue: -> 'Support'
	'recipient.email':
		type: String
		autoValue: -> 'support@jwmanagement.org'
	congregation:
		type: String
	text:
		type: String

Messages.attachSchema = Messages.schema