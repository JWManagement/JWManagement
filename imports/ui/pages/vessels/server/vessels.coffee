import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessels', (searchString) ->

	if typeof searchString == 'string' && searchString != '' && searchString.length >= 3
		# TODO: verify correct permissions
		if true # Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
			try
				regEx = new RegExp('.*' + searchString + '.*', 'i')

				Vessels.find
					$or: [
						name: regEx
					,
						callsign: regEx
					,
						eni: regEx
					,
						imo: regEx
					,
						mmsi: regEx
					]
			catch error
				@ready()
		else
			@ready()
	else
		@ready()
