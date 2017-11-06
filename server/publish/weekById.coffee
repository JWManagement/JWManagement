Meteor.publish 'weekById', (weekId) ->

	week = Weeks.findOne weekId, fields: projectId: 1

	if week? && Roles.userIsInRole @userId, Permissions.member, week.projectId
		Weeks.find weekId
	else
		@ready()
