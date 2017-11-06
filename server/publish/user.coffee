import { Permissions } from '/imports/api/util/permissions.coffee'

Meteor.publish 'user', (userId) ->

	if typeof userId == 'string' && userId != ''
		canViewUser = false

		if userId? and userId != @userId
			projects = Permissions.getGroupsForUser userId, Permissions.member

			for projectId in projects
				if Roles.userIsInRole @userId, Permissions.member, projectId
					canViewUser = true

			if canViewUser
				Meteor.users.find userId, fields:
					username: 1
					profile: 1
					roles: 1
			else
				@ready()
		else
			@ready()
	else
		@ready()
