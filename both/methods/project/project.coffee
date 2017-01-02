Meteor.methods

	updateProject: (projectId, field, value) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin
			check value, String

		if value.trim() != '' || field.indexOf('news') > -1
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

		# TODO: Projects.remove projectId
		throw new Meteor.Error 500, 'Not implemented yet; Please inform support@jwmanagement.org'
