import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/util/permissions.coffee'

Meteor.publish 'dashboard', ->
	projectIds = Permissions.getGroupsForUser @userId, Permissions.member

	[
		Projects.find _id: $in: projectIds,
			fields:
				name: 1
				news: 1
				tags: 1
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
		# TODO: limit fields
	]
