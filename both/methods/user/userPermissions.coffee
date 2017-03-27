Meteor.methods

	changeProjectRole: (projectId, userId, permission) ->
		projectPermissions = Permissions.member

		if Meteor.isServer
			check userId, Match.Where (userId) ->
				userId != Meteor.userId() || throw new Meteor.Error 500, TAPi18n.__('swal.ownPermission')
			check permission, Match.Where (permission) ->
				(permission in projectPermissions) || throw new Meteor.Error 500, 'Role ' + permission + ' invalid'
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		if Roles.userIsInRole userId, projectPermissions, projectId
			Roles.removeUsersFromRoles userId, projectPermissions, projectId
		Roles.addUsersToRoles userId, permission, projectId
