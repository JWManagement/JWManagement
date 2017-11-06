import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'
import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'

export Weeks = new Mongo.Collection 'weeks'

Weeks.methods = Methods
Weeks.helpers = Helpers

Weeks.deny
	insert: -> true
	update: -> true
	remove: -> true

Weeks.schema = new SimpleSchema

	projectId:
		type: String
	appliedTemplates:
		type: Array
	start:
		type: Number
	date:
		type: String
	days:
		type: Array
	'days.$.date':
		type: String
	'days.$.shifts':
		type: Array
