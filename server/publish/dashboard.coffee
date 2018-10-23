moment = require('moment')

Meteor.publish 'dashboard', (projectIds) ->

	[
		Projects.find _id: $in: projectIds,
			fields:
				name: 1
				description: 1
				vesselModule: 1
				news: 1
				tags: 1
				teams: 1
				meetings: 1
	,
		Shifts.find
			projectId: $in: projectIds
			$or: [
				date: $gte: parseInt(moment().format('YYYYDDDD'))
				$or: [
					'teams.participants._id': @userId
				,
					'teams.pending._id': @userId
				]
			,
				date: $lt: parseInt(moment().format('YYYYDDDD'))
				'teams.participants._id': @userId
			]
		,
			fields: _id: 1
	]
