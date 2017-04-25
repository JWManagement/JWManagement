import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Pictures } from '/imports/api/pictures/pictures.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'

Meteor.publish 'shift', (shiftId) ->
	if typeof shiftId == 'string' && shiftId != ''
		shift = Shifts.findOne shiftId, fields:
			projectId: 1
			tagId: 1
			scheduling: 1
			'teams.participants._id': 1
			'teams.participants.thisTeamleader': 1

		if shift?
			if Roles.userIsInRole @userId, Permissions.member, shift.projectId
				if Roles.userIsInRole @userId, Permissions.shiftScheduler, shift.projectId
					[
						Shifts.find shiftId
					,
						Pictures.find projectId: shift.projectId
					]
				else
					isTeamleader = false

					for team in shift.teams
						for participant in team.participants when participant._id == @userId
							isTeamleader = participant.thisTeamleader
							break
						break

					if isTeamleader
						[
							Shifts.find shiftId, fields:
								'teams.participants.teamleader': 0
								'teams.participants.substituteTeamleader': 0
								'teams.participants.informed': 0
								'teams.pending.teamleader': 0
								'teams.pending.substituteTeamleader': 0
								'teams.pending.checked': 0
								'teams.declined': 0
						,
							Pictures.find projectId: shift.projectId
						]
					else if Roles.userIsInRole @userId, Permissions.participant, shift.tagId
						[
							Shifts.find shiftId, fields:
								'teams.participants.teamleader': 0
								'teams.participants.substituteTeamleader': 0
								'teams.participants.informed': 0
								'teams.pending.teamleader': 0
								'teams.pending.substituteTeamleader': 0
								'teams.pending.checked': 0
								'teams.declined': 0
								'teams.report': 0
						,
							Pictures.find projectId: shift.projectId
						]
					else
						Shifts.find shiftId, fields: tagId: 1
			else
				@ready()
		else
			@ready()
	else
		@ready()
