import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'
import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'

Meteor.users.methods = Methods
Meteor.users.helpers = Helpers

Meteor.users.deny
	insert: -> true
	update: -> true
	remove: -> true

Meteor.users.schema = new SimpleSchema

	createdAt: type: Date
	username:
		type: String
		optional: true
	status:
		type: Object
		optional: true
		blackbox: true
	profile:
		type: Object
		blackbox: true
		optional: true
	state:
		type: String
		allowedValues: ['created', 'invited', 'active']
	services:
		type: Object
		optional: true
		blackbox: true
	roles:
		type: Object
		optional: true
		blackbox: true

Meteor.users.attachSchema = Meteor.users.schema
