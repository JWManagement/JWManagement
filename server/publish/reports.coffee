moment = require('moment')

Meteor.publish 'reports', (projectId, month) ->

	if typeof projectId == 'string' && projectId != '' && typeof month == 'string' && month != ''
		if Roles.userIsInRole @userId, Permissions.shiftAndStoreAdmin, projectId
			firstDay = parseInt moment(month, 'YYYY[M]MM').format('YYYYDDDD')
			lastDay = parseInt moment(month, 'YYYY[M]MM').endOf('month').format('YYYYDDDD')

			Shifts.find
				$and: [
					projectId: projectId
				,
					date: $gte: firstDay
				,
					date: $lte: lastDay
				]
			,
				fields:
					projectId: 1
					tag: 1
					date: 1
					start: 1
					end: 1
					teams: 1
		else
			@ready()
	else
		@ready()
