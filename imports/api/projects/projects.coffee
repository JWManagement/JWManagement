import SimpleSchema from 'simpl-schema'
import { Mongo } from 'meteor/mongo'
import { Methods } from './methods.coffee'
import { Helpers } from './helpers.coffee'

export Projects = new Mongo.Collection 'projects'

Projects.methods = Methods
Projects.helpers = Helpers

Projects.deny
	insert: -> true
	update: -> true
	remove: -> true

Projects.schema = new SimpleSchema

	name:
		type: String
	email:
		type: String
	language:
		type: String
		allowedValues: ['de', 'en']
	news:
		type: Object
	'news.date':
		type: String
	'news.text':
		type: String
	wiki:
		type: Object
	'wiki.tabs':
		type: Array
	'wiki.tabs.$._id':
		type: String
	'wiki.tabs.$.title':
		type: String
	'wiki.tabs.$.faq':
		type: Array
	'wiki.tabs.$.faq.$._id':
		type: String
	'wiki.tabs.$.faq.$.question':
		type: String
	'wiki.tabs.$.faq.$.answer':
		type: String
	tags:
		type: Array
	'tags.$._id':
		type: String
	'tags.$.name':
		type: String
	'tags.$.img':
		type: String
		allowedValues: [
			'none'
			'trolley'
			'information-stand'
			'helmet'
			'chef'
			'cleaning'
			'first-aid'
			'internet'
			'truck'
			'ship'
		]
	'tags.$.templates':
		type: Array
	teams:
		type: Array
	'teams.$._id':
		type: String
	'teams.$.name':
		type: String
	'teams.$.link':
		type: String
	'teams.$.description':
		type: String
	meetings:
		type: Array
	'meetings.$._id':
		type: String
	'meetings.$.name':
		type: String
	store:
		type: Object
	'store.mode':
		type: String
		allowedValues: ['simple', 'advanced']
	'store.items':
		type: Array
	notes:
		type: Array
	'notes.$._id':
		type: String
	'notes.$.date':
		type: Number
	'notes.$.time':
		type: Number
	'notes.$.author':
		type: String
	'notes.$.title':
		type: String
	'notes.$.text':
		type: String

Meteor.methods

	createProject: (args) ->
		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			newProject =
				_id: args.projectId
				name: args.projectName
				email: args.email
				language: args.language
				news: {}
				wiki: tabs: []
				tags: []
				teams: []
				meetings: []
				store: {}

			Projects.insert(newProject)
