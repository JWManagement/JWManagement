import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessels', (searchstring) ->

	if typeof searchstring == 'string' && searchstring != ''
		# TODO: verfiy correct permissions
		if true # Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
			Vessels.find searchstring
		else
			@ready()
	else
		@ready()
