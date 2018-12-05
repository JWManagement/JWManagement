moment = require('moment')

Meteor.methods

	registerUserForProject: (userId, token) ->
		oldUser = Meteor.users.findOne 'services.password.reset.token': token,
			fields: roles: 1

		newUser = Meteor.users.findOne userId,
			fields: _id: 1

		if oldUser? && newUser? && oldUser.roles?
			for id in Object.keys(oldUser.roles)
				if oldUser.roles[id]? && oldUser.roles[id][0]?
					Roles.addUsersToRoles userId, oldUser.roles[id][0], id

			Meteor.users.remove oldUser._id

	mergeAccounts: (oldUserId, newUserId) -> if newUserId == Meteor.userId() && oldUserId != newUserId
		oldUser = Meteor.users.findOne oldUserId,
			fields: roles: 1

		newUser = Meteor.users.findOne newUserId,
			fields: profile: 1

		if oldUser? && newUser?
			for id in Object.keys(oldUser.roles)
				if oldUser.roles[id][0]
					Roles.addUsersToRoles newUserId, oldUser.roles[id][0], id

			shifts = Shifts.find({
				$or: [{
					'teams.participants._id': oldUserId
				}, {
					'teams.pending._id': oldUserId
				}, {
					'teams.declined._id': oldUserId
				}]
			}).fetch()

			newShiftUser =
				_id: newUserId
				name: newUser.profile.firstname + ' ' + newUser.profile.lastname
				phone: newUser.profile.telefon
				email: newUser.profile.email
				thisTeamleader: false

			shifts.forEach (shift) ->
				shift.teams = shift.teams.map (team) ->
					team.participants = team.participants.map (user) ->
						if user?._id == oldUserId
							if user.thisTeamleader
								user = newShiftUser
								user.thisTeamleader = true
							else
								user = newShiftUser
							user.teamleader = Roles.userIsInRole newUserId, 'teamleader', shift.tagId
							user.substituteTeamleader = Roles.userIsInRole newUserId, 'substituteTeamleader', shift.tagId

						return user

					team.pending = team.pending.map (user) ->
						if user?._id == oldUserId
							user = newShiftUser
							user.thisTeamleader = false
							user.teamleader = Roles.userIsInRole newUserId, 'teamleader', shift.tagId
							user.substituteTeamleader = Roles.userIsInRole newUserId, 'substituteTeamleader', shift.tagId

						return user

					team.declined = team.declined.map (user) ->
						if user?._id == oldUserId
							user = newShiftUser
							user.thisTeamleader = false
							user.teamleader = Roles.userIsInRole newUserId, 'teamleader', shift.tagId
							user.substituteTeamleader = Roles.userIsInRole newUserId, 'substituteTeamleader', shift.tagId

						return user

					return team

				Shifts.update({ _id: shift._id }, shift)

			Meteor.users.remove oldUser._id

	changeProjectRole: (projectId, userId, permission) ->
		projectPermissions = Permissions.member

		if Meteor.isServer
			check userId, Match.Where (userId) ->
				userId != Meteor.userId() || throw new Meteor.Error 500, i18next.t('swal.ownPermission')
			check permission, Match.Where (permission) ->
				(permission in projectPermissions) || throw new Meteor.Error 500, 'Role ' + permission + ' invalid'
			check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		if Roles.userIsInRole userId, projectPermissions, projectId
			Roles.removeUsersFromRoles userId, projectPermissions, projectId
		Roles.addUsersToRoles userId, permission, projectId

	changeTagRole: (tagId, userId, permission) ->
		tagPermissions = Permissions.participant
		project = Projects.findOne 'tags._id': tagId,
			fields: _id: 1

		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: project._id }, isAdmin

		if permission in tagPermissions
			if Roles.userIsInRole userId, tagPermissions, tagId
				Roles.removeUsersFromRoles userId, tagPermissions, tagId

				if permission == 'teamleader'
					setTeamleader = true
					setSubstituteTeamleader = false
				else if permission == 'substituteTeamleader'
					setTeamleader = false
					setSubstituteTeamleader = true
				else if permission == 'participant'
					setTeamleader = false
					setSubstituteTeamleader = false

				shifts = Shifts.find
					projectId: project._id
					tagId: tagId
					$or: [
						'teams.participants._id': userId
					,
						'teams.pending._id': userId
					,
						'teams.declined._id': userId
					]

				for shift in shifts.fetch()
					for team in shift.teams
						if userId in (u._id for u in team.participants)
							updatedParticipants = team.participants

							for user in updatedParticipants when user._id == userId
								user.teamleader = setTeamleader
								user.substituteTeamleader = setSubstituteTeamleader

							Shifts.update _id: shift._id, 'teams._id': team._id,
								$set: 'teams.$.participants': updatedParticipants

						if userId in (u._id for u in team.pending)
							updatedPending = team.pending

							for user in updatedPending when user._id == userId
								user.teamleader = setTeamleader
								user.substituteTeamleader = setSubstituteTeamleader

							Shifts.update _id: shift._id, 'teams._id': team._id,
								$set: 'teams.$.pending': updatedPending

						if userId in (u._id for u in team.declined.filter((u) -> u?))
							updatedDeclined = team.participants

							for user in updatedDeclined when user._id == userId
								user.teamleader = setTeamleader
								user.substituteTeamleader = setSubstituteTeamleader

							Shifts.update _id: shift._id, 'teams._id': team._id,
								$set: 'teams.$.declined': updatedDeclined

			Roles.addUsersToRoles userId, permission, tagId
		else if permission == 'none'
			if Roles.userIsInRole userId, tagPermissions, tagId
				Roles.removeUsersFromRoles userId, tagPermissions, tagId

				Shifts.update
					projectId: project._id
					tagId: tagId
					date: $gt: parseInt moment(new Date).format('YYYYDDDD')
					'teams.participants._id': userId
				,
					$pull: 'teams.$.participants': _id: userId
				,
					multi: true

				Shifts.update
					projectId: project._id
					tagId: tagId
					date: $gt: parseInt moment(new Date).format('YYYYDDDD')
					'teams.pending._id': userId
				,
					$pull: 'teams.$.pending': _id: userId
				,
					multi: true

				Shifts.update
					projectId: project._id
					tagId: tagId
					date: $gt: parseInt moment(new Date).format('YYYYDDDD')
					'teams.declined._id': userId
				,
					$pull: 'teams.$.declined': _id: userId
				,
					multi: true
		else
			throw new Meteor.Error 500, 'Role ' + permission + ' invalid'

	removeUserFromProject: (projectId, username) ->
		project = Projects.findOne projectId, fields: tags: 1
		user = Meteor.users.findOne username: username,
			fields: _id: 1

		if Meteor.isServer && user?
			check { userId: Meteor.userId(), projectId: project._id }, isAdmin
			check { userId: user._id, projectId: project._id }, isMember

			Roles.removeUsersFromRoles user._id, Permissions.member, projectId

			if project? && project.tags
				for tag in project.tags
					Meteor.call 'changeTagRole', tag._id, user._id, 'none', ->
						for group in Roles.getGroupsForUser(user._id)
							return if Roles.userIsInRole(user._id, Permissions.member, group)
							return if Roles.userIsInRole(user._id, Permissions.participant, group)

						Meteor.users.remove user._id
