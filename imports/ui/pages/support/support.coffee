import '/imports/ui/components/allProjects/allProjects.coffee'
import '/imports/ui/components/allUsers/allUsers.coffee'
import './support.tpl.jade'

Template.support.onCreated ->

	@autorun -> Meteor.subscribe 'support'

Template.support.helpers

	isSupport: -> Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP

	projectList: ->
		Projects.find {},
			fields: name: 1
		,
			sort: name: 1
		.fetch()

	userList: ->
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
