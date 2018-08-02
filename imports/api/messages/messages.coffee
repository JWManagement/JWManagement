SimpleSchemaObj = require 'simpl-schema'
{ Mongo } = require 'meteor/mongo'

{ Methods } = require './methods.coffee'
{ Helpers } = require './helpers.coffee'

Messages = new Mongo.Collection 'messages'

SimpleSchema = SimpleSchemaObj.default;

Messages.deny
	insert: -> true
	update: -> true
	remove: -> true

Messages.schema = new SimpleSchema

	_id:
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoValue: -> Random.id()
	createdAt:
		type: Date
		autoValue: -> new Date
	type:
		type: String
		allowedValues: ['enquiry']
		autoValue: -> 'enquiry'
	status:
		type: String
		allowedValues: ['new', 'done']
		autoValue: -> 'new'
	language:
		type: String
		autoValue: -> 'de'
	author:
		type: Object
	'author.name':
		type: String
	'author.email':
		type: String
		regEx: SimpleSchema.RegEx.EmailWithTLD
	recipient:
		type: Object
	'recipient.name':
		type: String
		autoValue: -> 'Support'
	'recipient.email':
		type: String
		autoValue: -> 'support@jwmanagement.org'
	projectName:
		type: String
	text:
		type: String

Messages.attachSchema = Messages.schema

Messages.methods = Methods
Messages.helpers = Helpers

exports.Messages = Messages
