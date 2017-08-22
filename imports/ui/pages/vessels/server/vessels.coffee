import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessels', (searchString) ->

	if typeof searchString == 'string' && searchString != '' && searchString.length >= 3
		# TODO: verify correct permissions
		if true # Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
			Vessels.find
				$or: [
					localName: new RegExp('.*' + searchString + '.*', 'i')
				,
					callsign: new RegExp('.*' + searchString + '.*', 'i')
				,
					eni: new RegExp('.*' + searchString + '.*', 'i')
				,
					imo: new RegExp('.*' + searchString + '.*', 'i')
				,
					mmsi: new RegExp('.*' + searchString + '.*', 'i')
				]
		else
			@ready()
	else
		@ready()
