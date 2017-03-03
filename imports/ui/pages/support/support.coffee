import { Projects } from '/imports/api/projects/projects.coffee'
import { Messages } from '/imports/api/messages/messages.coffee'

import '/imports/api/resources/footable.js'

import '/imports/ui/components/enquiryList/enquiryList.coffee'
import '/imports/ui/components/allProjects/allProjects.coffee'
import '/imports/ui/components/allUsers/allUsers.coffee'

import './support.tpl.jade'

Template.support.onCreated ->

	@autorun -> Meteor.subscribe 'support'

Template.support.helpers

	isSupport: -> Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP

	enquiries: ->
		Messages.find
			'recipient.name': 'Support'
		, {},
			sort: createdAt: -1
		.fetch()

	projects: ->
		Projects.find {},
			fields: name: 1
		,
			sort: name: 1
		.fetch()

	users: ->
		Meteor.users.find {},
			fields:
				roles: 1
				username: 1
				'profile.firstname': 1
				'profile.lastname': 1
				'profile.language': 1
		,
			sort:
				'profile.lastname': 1
				'profile.firstname': 1
		.fetch()
