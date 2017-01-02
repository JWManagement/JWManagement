Meteor.publish 'futureWeeks', (projectId, week) ->

	if Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
		if parseInt(moment(new Date()).format('YYYYDDDD')) < parseInt(moment(week).format('YYYYDDDD'))
			week = moment(new Date()).format('GGGG[W]WW')

		start = parseInt moment(week).isoWeekday(1).format('YYYYDDDD')

		Weeks.find projectId: projectId, start: $gte: start
	else
		@ready()
