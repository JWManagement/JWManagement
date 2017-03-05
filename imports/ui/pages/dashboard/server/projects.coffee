import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/util/permissions.coffee'

Meteor.publishComposite 'dashboard.projects',

	find: ->
		Meteor.users.find _id: @userId,
			fields: roles: 1

	children: [
		find: (user) ->
			projectIds = Object.keys(user.roles).filter (key) -> user.roles[key][0] in Permissions.member

			Projects.find _id: $in: projectIds,
				fields:
					name: 1
					news: 1
					tags: 1
	]
