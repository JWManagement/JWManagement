import SimpleSchema from 'simpl-schema'

import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'
import { Validators } from '/imports/api/util/validators.coffee'

export PermissionMethods =

	removeUserFromProject: new ValidatedMethod
		name: 'Meteor.users.methods.permissions.removeUserFromProject'
		validate: (args) ->
			new SimpleSchema
				projectId:
					type: String
					custom: ->
						Validators.project.validId
						Validators.project.isAdmin
				userId:
					type: String
					custom: -> Validators.user.validId
			.validator() args
		run: (args) -> if Meteor.isServer
			projectId = args.projectId
			userId = args.userId
			project = Projects.findOne projectId, fields: 'tags._id': 1
			lastProjectLeft = true

			Roles.removeUsersFromRoles userId, Permissions.member, projectId

			for group in Roles.getGroupsForUser userId
				if Roles.userIsInRole userId, Permissions.member, group
					lastProjectLeft = false

			if lastProjectLeft
				Meteor.users.remove user._id
			else
				project.tags.filter (tag) ->
					Roles.userIsInRole userId, Permissions.participant, tag._id
				.forEach (tag) ->
					Meteor.users.methods.permissions.changeTagRole.call
						tagId: tag._id
						userId: userId
						permission: 'none'

	changeTagRole: new ValidatedMethod
		name: 'Meteor.users.methods.permissions.changeTagRole'
		validate: (args) ->
			new SimpleSchema
				userId:
					type: String
					custom: -> Validators.user.validId
				tagId:
					type: String
					custom: ->
						Validators.tag.validId
						Validators.tag.isAdmin
				permission:
					type: String
					allowedValues: [
						'teamleader'
						'substituteTeamleader'
						'participant'
						'none'
					]
			.validator() args
		run: (args) -> if Meteor.isServer
			tagId = args.tagId
			userId = args.userId
			permission = args.permission
			projectId = Projects.findOne({'tags._id': tagId}, fields: _id: 1)._id

			Roles.setUserRoles userId, [], tagId

			if permission == 'none'
				Shifts.update
					projectId: projectId
					tagId: tagId
					date: $gt: parseInt moment().format('YYYYDDDD')
					$or: [
						'teams.participants._id': userId
					,
						'teams.pending._id': userId
					,
						'teams.declined._id': userId
					]
				,
					$pull:
						'teams.$.participants': _id: userId
						'teams.$.pending': _id: userId
						'teams.$.declined': _id: userId
				,
					multi: true
			else
				Roles.addUsersToRoles userId, permission, tagId

				setTeamleader = false
				setSubstituteTeamleader = false

				if permission == 'teamleader'
					setTeamleader = true
				else if permission == 'substituteTeamleader'
					setSubstituteTeamleader = true

				Shifts.find
					projectId: projectId
					tagId: tagId
					$or: [
						'teams.participants._id': userId
					,
						'teams.pending._id': userId
					,
						'teams.declined._id': userId
					]
				.forEach (shift) ->
					shift.teams.forEach (team) ->
						['participants', 'pending', 'declined'].forEach (store) ->
							if team[store].filter((u) -> u._id == userId).length > 0
								set = {}
								set['teams.$.' + store] = team[store].map (user) ->
									if user._id == userId
										user.teamleader = setTeamleader
										user.substituteTeamleader = setSubstituteTeamleader

								Shifts.update _id: shift._id, 'teams._id': team._id,
									$set: set
