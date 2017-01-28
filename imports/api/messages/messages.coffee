import { Mongo } from 'meteor/mongo'
import { Hooks } from './hooks.coffee'

class MessagesCollection extends Mongo.Collection

	insert: (doc, callback) ->
		doc.createdAt = doc.createdAt || new Date()

		result = super.insert doc, callback

		Hooks.afterInsertMessage doc

		result

	update: (selector, modifier) ->
		result = super.update selector, modifier

		Hooks.afterUpdateMessage selector, modifier

		result

	remove: (selector) ->
		todos = this.find(selector).fetch()
		result = super.remove selector

		Hooks.afterRemoveMessages todos

		result

export Messages = new MessagesCollection 'messages'

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

Messages.publicFields =
	_id: 1
	createdAt: 1

Messages.helpers

	message: -> Messages.findOne @listId
