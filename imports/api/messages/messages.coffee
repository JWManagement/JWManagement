import { Mongo } from 'meteor/mongo'
import { Hooks } from './hooks.coffee'
import { Methods } from './methods.coffee'

`
class MessagesCollection extends Mongo.Collection {

	insert(doc, callback) {
		doc.createdAt = doc.createdAt || new Date();

		var result = super.insert(doc, callback);

		Hooks.afterInsertMessage(doc);

		return result;
	}

	update(selector, modifier) {
		result = super.update(selector, modifier);

		Hooks.afterUpdateMessage(selector, modifier);

		return result;
	}

	remove(selector) {
		todos = this.find(selector).fetch();
		result = super.remove(selector);

		Hooks.afterRemoveMessages(todos);

		return result;
	}
}
`

export Messages = new MessagesCollection 'messages'

Messages.methods = Methods

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

Messages.helpers =

	message: -> Messages.findOne @listId
