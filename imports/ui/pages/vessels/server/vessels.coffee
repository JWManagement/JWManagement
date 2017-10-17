import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessels', (searchString, projectId) ->

	if typeof searchString != 'string' || searchString == '' || searchString.length < 3
		@ready()

	if !Roles.userIsInRole @userId, Permissions.member, projectId
		@ready()

	project = Projects.findOne projectId,
		fields: _id: 0, vesselModule: 1

	if !project.vesselModule
		@ready()

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
		,
			limit: 20
	catch error
		@ready()
