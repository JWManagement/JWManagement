Meteor.methods

	deleteProject: (projectId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		# TODO: Projects.remove projectId
		throw new Meteor.Error 500, 'Not implemented yet; Please inform support@jwmanagement.org'
