Meteor.publish 'admin', (projectId) ->

	Projects.find projectId,
		fields: vesselModule: 1
