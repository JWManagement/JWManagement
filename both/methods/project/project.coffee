moment = require('moment')

Meteor.methods

	updateProject: (projectId, field, value) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		if field == 'vesselModule' && Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			Projects.update projectId, $set: vesselModule: value
		else if field == 'harbors' || value.trim() != '' || field.indexOf('news') > -1
			set = {}
			set[field] = value

			Projects.update projectId, $set: set
		else if field == 'email'
			Projects.update projectId, $set: email: 'no-reply@jwmanagement.org'

			throw new Meteor.Error 500, 'Email cannot be empty -> replaced with default value'
		else
			throw new Meteor.Error 500, 'Name cannot be empty'

	deleteProject: (projectId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		project = Projects.findOne(projectId)

		hasOpenShifts = Shifts.find({
			projectId: projectId,
			date: {
				$gte: parseInt(moment().format('YYYYDDDD'))
			},
			'teams.participants': {
				$exists: true,
				$not: {
					$size: 0
				}
			}
		}).fetch().length > 0

		if hasOpenShifts
			throw new Meteor.Error(500, 'Please delete all planned shifts for the future that already have participants')
		else
			Shifts.remove projectId: projectId
			Weeks.remove projectId: projectId

			users = Roles.getUsersInRole(Permissions.member, projectId).fetch()
			for user in users
				Roles.removeUsersFromRoles(user._id, Permissions.member, projectId)

				for tag in project.tags
					Roles.removeUsersFromRoles(user._id, Permissions.participant, tag._id)

			Projects.remove projectId

	getProjectCount: ->
		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			Projects.find({}, fields: _id: 1).count()
		else
			0
