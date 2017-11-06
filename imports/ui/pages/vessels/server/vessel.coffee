import { Vessels } from '/imports/api/vessels/vessels.coffee'

Meteor.publish 'vessel', (vesselId, projectId) ->

	if typeof vesselId == 'string' && vesselId != ''
		@ready()

	if !Roles.userIsInRole @userId, Permissions.member, projectId
		@ready()

	project = Projects.findOne projectId,
		fields: _id: 0, vesselModule: 1

	if !project.vesselModule
		@ready()

	Vessels.find vesselId
