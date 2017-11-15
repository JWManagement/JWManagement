Meteor.publish 'support.users', (searchString) ->

	if typeof searchString == 'string' && searchString != '' && searchString.length >= 3
		if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
			try
				regEx = new RegExp('.*' + searchString + '.*', 'i')

				Meteor.users.find
					$or: [
						username: regEx
					,
						'profile.firstname': regEx
					,
						'profile.lastname': regEx
					,
						'profile.email': regEx
					]
				, fields:
					roles: 1
					username: 1
					'profile.firstname': 1
					'profile.lastname': 1
					'profile.email': 1
					'profile.language': 1
			catch error
				@ready()
		else
			@ready()
	else
		@ready()
