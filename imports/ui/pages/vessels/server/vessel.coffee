import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessel', (vesselId) ->

	if typeof vesselId == 'string' && vesselId != ''
		# TODO: verify correct permissions
		if true # Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
			Vessels.find vesselId
		else
			@ready()
	else
		@ready()
