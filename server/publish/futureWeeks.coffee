Meteor.publish 'futureWeeks', (projectId, week) ->

	if Roles.userIsInRole @userId, Permissions.member, projectId
		if parseInt(moment().format('YYYYDDDD')) < parseInt(moment(week).format('YYYYDDDD'))
			week = moment().format('GGGG[W]WW')

		start = parseInt moment(week).isoWeekday(1).format('YYYYDDDD')

		Weeks.find projectId: projectId, start: $gte: start
	else
		@ready()
