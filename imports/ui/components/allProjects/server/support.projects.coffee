Meteor.publish 'support.projects', (searchString) ->

	if typeof searchString == 'string' && searchString != '' && searchString.length >= 3
		if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
			try
				regEx = new RegExp('.*' + searchString + '.*', 'i')

				Projects.find
					$or: [
						_id: regEx
					,
						name: regEx
					,
						email: regEx
					]
				, fields:
					name: 1
					email: 1
			catch error
				@ready()
		else
			@ready()
	else
		@ready()
