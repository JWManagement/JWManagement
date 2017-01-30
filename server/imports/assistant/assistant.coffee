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
				shift = Shifts.findOne shift, fields: _id: 1, tagId: 1

				allShiftIds.push shift._id

				if shift.tagId == tagId
					shiftIds.push shift._id

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
			setTeamleaders = team.participants.filter (user) -> user.thisTeamleader

			if setTeamleaders.length == 0 && teamleaderInThisTeam.length > 0
				thisTeamleader = false
				allTeamleaders = []
				allSubTeamleaders = []

				# Teamleiter heraussuchen, die noch nicht am Maximum für diese Zeitperiode oder diesen Tag sind
				for user in teamleaderInThisTeam
					maxReached = Helpers.getMaxReachedPeriod user
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
			# Sortiere alle Teamleiter nach deren Abstand zur durchschnittlichen Ratio absteigend
			teamleadersByDeviationRatio = R.setTeamleaders.sort (a, b) -> R.users[b._id].targetAcceptionRatio - R.users[a._id].targetAcceptionRatio

			# Wenn keine Teamleiter gefunden wurden, brich direkt ab
			if teamleadersByDeviationRatio.length == 0 then endReached = true

			# Durchlaufe alle Teamleiter und versuche zu optimieren
			for teamleader, index in teamleadersByDeviationRatio
				# Suche alle möglichen Tausch-Kandidaten
				teamleaderChangeables = Helpers.searchTeamleaderChangeables teamleader._id

				# Sortiere Tausch-Kandidaten für bestmöglichen Tausch
				teamleaderChangeables = teamleaderChangeables.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio
				teamleaderChangeables = teamleaderChangeables.filter (changeable) -> R.users[changeable._id].targetAcceptionRatio < teamleader.targetAcceptionRatio

				# Durchlaufe die Tausch-Kandidaten
				for changeable, cIndex in teamleaderChangeables
					maxReached = Helpers.getMaxReachedPeriod changeable

					if !maxReached
						# Prüfe, ob Tauschen Sinn macht
						beforeRatioDifference = Math.abs R.users[teamleader._id].targetAcceptionRatio - R.users[changeable._id].targetAcceptionRatio
						newTargetAcceptionRatioTl = (R.users[teamleader._id].acceptions - 1) / R.users[teamleader._id].targetPeriod
						newTargetAcceptionRatioCh = (R.users[changeable._id].acceptions + 1) / R.users[changeable._id].targetPeriod
						afterRatioDifference = Math.abs newTargetAcceptionRatioTl - newTargetAcceptionRatioCh

						# Tausche, wenn die Differenz der Tausch-Kandidaten zum
						if afterRatioDifference < beforeRatioDifference
							for waypoint in changeable.way
								Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId
								Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, true

							cIndex = teamleaderChangeables.length

							# Wenn Änderung vollzogen, sortiere neu und beginne Optimierung von vorne
							index = teamleadersByDeviationRatio.length
						else
							# TODO: Überprüfen, ob Tausch trotzdem einen Vorteil bringen würde (für die nicht-Teamleiter)

				# Wenn letzer Teamleiter erreicht, beende Optimierung
				if index == teamleadersByDeviationRatio.length - 1 then endReached = true

	optimizeMaxReachedTeamleaders: ->

		# Alle Teams ohne Teilnehmer durchlaufen
		for team in R.teams.filter((team) -> team.participants.length == 0)

			# Mögliche beworbene Teamleiter durchlaufen
			for teamleader, index in team.pending when teamleader.teamleader || teamleader.substituteTeamleader
				teamleaderChangeables = Helpers.searchTeamleaderChangeables teamleader._id
				maxReachedDay = Helpers.getMaxReachedDay teamleader, team

				# Wenn User bereits das Maximum dieses Tages erreicht hat, nur Schichten an diesem Tag prüfen
				if maxReachedDay
					teamleaderChangeables = teamleaderChangeables.filter (changeable) ->
						fTeam = (R.teams.filter (t) -> t._id == changeable.way[0].teamId && t.shiftId == changeable.way[0].shiftId)[0]
						fTeam.date == team.date

				# Mögliche Tausch-Kandidaten für diesen Teamleiter heraussuchen
				for changeable in teamleaderChangeables
					maxReached = Helpers.getMaxReachedPeriod changeable

					if !maxReached
						# Tausch in den anderen Schichten vornehmen
						for waypoint in changeable.way
							Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId
							Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, true

						# Teamleiter dank des gewonnenen Platzes in dieser Schicht einteilen
						Helpers.pendingToParticipants team.shiftId, team._id, teamleader._id, true

						# Nächstes Team
						index = team.pending.length
						break

	saveToDB: ->

		for team in R.teams
			for user in team.participants
				delete user.targetPeriod
				delete user.maxPeriod
				delete user.maxDay
				delete user.acceptions
				delete user.doubleShiftAllowed
				delete user.targetAcceptionRatio
				delete user.requests
				delete user.confirmations
				delete user.tlConfirmations

			for user in team.pending
				delete user.targetPeriod
				delete user.maxPeriod
				delete user.maxDay
				delete user.acceptions
				delete user.doubleShiftAllowed
				delete user.targetAcceptionRatio
				delete user.requests
				delete user.confirmations
				delete user.tlConfirmations

			shiftId = team.shiftId

			delete team.shiftId
			delete team.date
			delete team.start
			delete team.end
			delete team.requestAmount

			Shifts.update _id: shiftId, 'teams._id': team._id,
				$set: 'teams.$': team
