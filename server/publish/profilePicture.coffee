Meteor.publish 'profilePicture', (userId) ->

	if userId == @userId
		Pictures.find userId: @userId
	else
		canViewUser = false
		groups = Roles.getGroupsForUser userId, Permissions.member

		for group in groups
			if Roles.userIsInRole userId, Permissions.member, group._id
				canViewUser = true

		if canViewUser
			Pictures.find userId: userId
		else
			@ready()
