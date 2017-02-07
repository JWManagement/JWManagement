import { Shifts } from './shifts.coffee'

export Scheduler =

	getBestTeamleader: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId, fields: teams: 1, tagId: 1
		chosenId = false

		for team in shift.teams when team._id == teamId
			allUsers = team.pending.concat(team.participants).filter (user) -> user.teamleader || user.substituteTeamleader
			allUsers.push @getParticipant userId, shift.tagId, false

			for user in allUsers
				hasTeamleader = true

				if !chosenId?
					if user.teamleader
						return user._id
					else if user.substituteTeamleader
						chosenId = user._id
						chosenIsTeamleader = false
				else if !chosenIsTeamleader && user.teamleader
					return user._id

		if chosenId then chosenId else false


