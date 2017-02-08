Meteor.methods

	changeProjectRole: (projectId, userId, permission) ->
		projectPermissions = Permissions.member

		if Meteor.isServer
			check userId, Match.Where (userId) ->
				userId != Meteor.userId() || throw new Meteor.Error 500, TAPi18n.__('swal.ownPermission')
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

						if userId in (u._id for u in team.declined)
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
					date: $gt: parseInt moment().format('YYYYDDDD')
					'teams.participants._id': userId
				,
					$pull: 'teams.$.participants': _id: userId
				,
					multi: true

				Shifts.update
					projectId: project._id
					tagId: tagId
					date: $gt: parseInt moment().format('YYYYDDDD')
					'teams.pending._id': userId
				,
					$pull: 'teams.$.pending': _id: userId
				,
					multi: true

				Shifts.update
					projectId: project._id
					tagId: tagId
					date: $gt: parseInt moment().format('YYYYDDDD')
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

		if user?
			if Meteor.isServer
				check { userId: Meteor.userId(), projectId: project._id }, isAdmin
				check { userId: user._id, projectId: project._id }, isMember

			Roles.removeUsersFromRoles user._id, Permissions.member, projectId

			if project? && project.tags
				for tag in project.tags
					Meteor.call 'changeTagRole', tag._id, user._id, 'none'
