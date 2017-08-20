Meteor.methods

	updateProject: (projectId, field, value) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		if field == 'vesselProject' && Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			Projects.update projectId, $set: vesselProject: value
		else if value.trim() != '' || field.indexOf('news') > -1
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
		name = Meteor.user().profile.firstname + ' ' + Meteor.user().profile.lastname
		email = Meteor.user().profile.email
		type = 'Project deletion request'
		message = name + ' requested the deletion of project ' + project.name + ' (' + projectId + ')'

		Meteor.call 'sendMessage', name, email, type, message, (e, r) ->
			if e
				handleError e
			else
				swal 'support@jwmanagement.org has been informed', '', 'success'
