Meteor.methods

	registerUserForProject: (userId, token) ->
		oldUser = Meteor.users.findOne 'services.password.reset.token': token,
			fields: roles: 1

		newUser = Meteor.users.findOne userId,
			fields: _id: 1

		if oldUser? && newUser?
			for id in Object.keys(oldUser.roles)
				Roles.addUsersToRoles userId, oldUser.roles[id][0], id

			Meteor.users.remove oldUser._id

	mergeAccounts: (oldUserId, newUserId) -> if oldUserId != newUserId
		oldUser = Meteor.users.findOne oldUserId,
			fields: roles: 1

		newUser = Meteor.users.findOne newUserId,
			fields: _id: 1

		if oldUser? && newUser?
			for id in Object.keys(oldUser.roles)
				Roles.addUsersToRoles newUserId, oldUser.roles[id][0], id

			Meteor.users.remove oldUser._id

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
