Meteor.methods

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

	getProjectCount: ->
		if Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP
			Projects.find({}, fields: _id: 1).count()
		else
			0
