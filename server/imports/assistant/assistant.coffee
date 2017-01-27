import { Helpers } from './helpers.coffee'
import { R } from './variables.coffee'

export Assistant =

	fillShiftsArray: (projectId, date, tagId) ->

		shiftIds = []
		allShiftIds = []
		week = Weeks.findOne projectId: projectId, date: date

		# IDs der Schichten an diesem Tag raussuchen
		for day in week.days
			for shift in day.shifts
				allShiftIds.push shift

				if shift.tagId == tagId
					shiftIds.push shift

		R.allShifts = Shifts.find _id: $in: allShiftIds
		R.allShifts = R.allShifts.fetch()

		R.shifts = Shifts.find _id: $in: shiftIds
		R.shifts = R.shifts.fetch()

	fillUsersArray: ->

		for shift in R.shifts
			for team in shift.teams
				for user in team.pending
					if user._id in Object.keys R.users
						# Schicht in requests Array aufnehmen
						R.users[user._id].requests.push shiftId: shift._id, teamId: team._id
					else
						# Summe aller akzeptierten Schichten tagübergreifend herausfinden
						acceptions = 0

						for s in R.allShifts
							for t in s.teams
								for u in t.participants when u._id == user._id
									acceptions++

						# User anlegen
						user.targetPeriod = 1 # Random.choice [1, 2, 3] # TODO: CHANGE get for this tag
						user.maxPeriod = 2 # user.targetPeriod + 1 # TODO: CHANGE get for this tag
						user.maxDay = 2 # TODO: CHANGE get for this tag
						user.acceptions = acceptions
						user.doubleShiftAllowed = true
						user.targetAcceptionRatio = user.acceptions / user.targetPeriod
						user.requests = [{shiftId: shift._id, teamId: team._id}]
						user.confirmations = []
						user.tlConfirmations = []
						R.users[user._id] = user

	fillTeamsArray: ->

		for shift in R.shifts
			for team in shift.teams
				hasTeamleader = false

				# Hat das Team bereits einen möglichen Teamleiter?
				for user in team.pending when user.teamleader || user.substituteTeamleader
					hasTeamleader = true

				# Wenn ja, dann Team in globales Array aufnehmen
				if hasTeamleader
					team.shiftId = shift._id
					team.date = shift.date
					team.start = shift.start
					team.end = shift.end
					team.requestAmount = team.pending.length

					if team.requestAmount >= team.min # TODO: als wahrscheinlichkeit berücksichten
						R.teams.push team

		# Teams nach Anzahl der Bewerbungen absteigend sortieren
		teams = R.teams.sort (a, b) -> b.requestAmount - a.requestAmount

	setTeamleaders: ->

		for team in R.teams
			teamleaderInThisTeam = team.pending.filter (user) -> user.teamleader || user.substituteTeamleader

			if teamleaderInThisTeam.length > 0
				thisTeamleader = false
				allTeamleaders = []
				allSubTeamleaders = []

				# Teamleiter heraussuchen, die noch nicht am Maximum sind und noch keine
				# angenommene Bewerbung an diesem Tag haben
				for user in teamleaderInThisTeam
					maxReached = R.users[user._id].acceptions >= R.users[user._id].maxPeriod
					maxReachedDay = Helpers.getMaxReachedDay user, team

					if !maxReached && !maxReachedDay
						if user.teamleader
							allTeamleaders.push user
						else if user.substituteTeamleader
							allSubTeamleaders.push user

				# User mit der niedrigsten Ratio auswählen
				if allTeamleaders.length > 0
					thisTeamleader = (allTeamleaders.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio)[0]
				else if allSubTeamleaders.length > 0
					# Wenn kein Teamleiter vorhanden ist, suche nach Ersatz-Teimleitern
					thisTeamleader = (allSubTeamleaders.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio)[0]

				if thisTeamleader
					# Teamleiter einteilen, wenn vorhanden
					Helpers.pendingToParticipants team.shiftId, team._id, thisTeamleader._id, true

					R.setTeamleaders.push thisTeamleader

	optimizeTeamleaders: ->

		endReached = false

		while !endReached

			# Sortiere alle Teamleiter, deren Ratio höher als der Durschnitt ist, nach deren Ratio absteigend
			averageRatio = Helpers.getAverageRatioTl()
			averageDeviationRatio = Helpers.getAverageDeviationRatioTl()
			teamleaderOverAverageRatio = R.setTeamleaders.filter (teamleader) -> teamleader.targetAcceptionRatio > averageDeviationRatio
			teamleaderOverAverageRatio = R.setTeamleaders.sort (a, b) -> R.users[b._id].targetAcceptionRatio - R.users[a._id].targetAcceptionRatio

			# Durchlaufe alle Teamleiter und versuche zu optimieren
			for teamleader, index in teamleaderOverAverageRatio
				# Suche alle möglichen Tausch-Kandidaten
				teamleaderChangeables = Helpers.searchTeamleaderChangeables teamleader._id
				teamleaderChangeables = teamleaderChangeables.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio

				# Durchlaufe die Tausch-Kandidaten
				for changeable, cIndex in teamleaderChangeables
					maxReached = R.users[changeable._id].acceptions >= R.users[changeable._id].maxPeriod

					if !maxReached

						# Prüfe, ob Tauschen Sinn macht
						beforeOptimumDeviation = Math.abs (R.users[teamleader._id].targetAcceptionRatio + R.users[changeable._id].targetAcceptionRatio) / 2 - averageRatio
						newTargetAcceptionRatioTl = (R.users[teamleader._id].acceptions - 1) / R.users[teamleader._id].targetPeriod
						newTargetAcceptionRatioCh = (R.users[changeable._id].acceptions + 1) / R.users[changeable._id].targetPeriod
						afterOptimumDeviation = Math.abs (newTargetAcceptionRatioTl + newTargetAcceptionRatioCh) / 2 - averageRatio

						if afterOptimumDeviation < beforeOptimumDeviation
							for waypoint in changeable.way
								Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId
								Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, true

							cIndex = teamleaderChangeables.length

							# Wenn Änderung vollzogen, sortiere neu und beginne Optimierung von vorne
							index = teamleaderOverAverageRatio.length
						else
							# TODO: Überprüfen, ob Tausch trotzdem einen Vorteil bringen würde

				# Wenn letzer Teamleiter erreicht, beende Optimierung
				if index == teamleaderOverAverageRatio.length - 1 then endReached = true

	saveToDB: ->

		for team in R.teams
			Shifts.update _id: team.shiftId, 'teams._id': team._id,
				$set: 'teams.$': team
