import SimpleSchema from 'simpl-schema'

import { Projects } from '/imports/api/projects/projects.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'
import { Validators } from '/imports/api/util/validators.coffee'

import { MainMethods } from './methods/main.coffee'
import { TagMethods } from './methods/tags.coffee'

export Methods =

	main: MainMethods
	tags: TagMethods

	delete: new ValidatedMethod
		name: 'Projects.methods.delete'
		validate: (args) ->
			new SimpleSchema
				projectId:
					type: String
					custom: ->
						Validators.project.validId
						Validators.project.isAdmin
			.validator() args
		run: (args) -> if Meteor.isServer
			projectId = args.projectId
			project = Projects.findOne projectId, fields: name: 1

			Shifts.remove projectId: projectId
			Weeks.remove projectId: projectId

			for user in Roles.getUsersInRole(Permissions.member, projectId).fetch()
				Meteor.users.methods.permissions.removeUserFromProject.call
					projectId: projectId
					userId: user._id

			Projects.remove projectId
