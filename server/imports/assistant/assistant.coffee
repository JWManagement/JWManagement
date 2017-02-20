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
						user.targetPeriod = 3 # Random.choice [1, 2, 3] # TODO: CHANGE get for this tag
						user.maxPeriod = 3 # user.targetPeriod + 1 # TODO: CHANGE get for this tag
						user.maxDay = 1 # TODO: CHANGE get for this tag
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
					team.min = 5
					team.max = 6

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

		averageRatio = Helpers.getAverageRatioAll()

		while !endReached
			doRestart = false

			# Sortiere alle Teamleiter nach deren Abstand zur durchschnittlichen Ratio absteigend
			teamleadersByDeviationRatio = R.setTeamleaders.sort (a, b) ->
				Math.abs(averageRatio - R.users[b._id].targetAcceptionRatio) - Math.abs(averageRatio - R.users[a._id].targetAcceptionRatio)

			# Wenn keine Teamleiter gefunden wurden, brich direkt ab
			if teamleadersByDeviationRatio.length == 0 then endReached = true

			# Durchlaufe alle Teamleiter und versuche zu optimieren
			for teamleader, index in teamleadersByDeviationRatio when !doRestart
				# Suche alle möglichen Tausch-Kandidaten
				teamleaderChangeables = Helpers.searchTeamleaderChangeables teamleader._id

				# Sortiere Tausch-Kandidaten für bestmöglichen Tausch
				teamleaderChangeables = teamleaderChangeables.sort (a, b) ->
					Math.abs(R.users[teamleader._id].targetAcceptionRatio - R.users[a._id].targetAcceptionRatio) - Math.abs(R.users[teamleader._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio)

				# Durchlaufe die Tausch-Kandidaten
				for changeable, cIndex in teamleaderChangeables
					maxReached = Helpers.getMaxReachedPeriod changeable

					if !maxReached
						# Prüfe, ob Tauschen Sinn macht
						#beforeRatio = Helpers.getAverageDeviationRatioAll()

						beforeRatioDifference = Math.abs R.users[teamleader._id].targetAcceptionRatio - R.users[changeable._id].targetAcceptionRatio
						newTargetAcceptionRatioTl = (R.users[teamleader._id].acceptions - 1) / R.users[teamleader._id].targetPeriod
						newTargetAcceptionRatioCh = (R.users[changeable._id].acceptions + 1) / R.users[changeable._id].targetPeriod
						afterRatioDifference = Math.abs newTargetAcceptionRatioTl - newTargetAcceptionRatioCh

						#R.users[teamleader._id].acceptions--
						#R.users[teamleader._id].targetAcceptionRatio = newTargetAcceptionRatioTl
						#R.users[changeable._id].acceptions++
						#R.users[changeable._id].targetAcceptionRatio = newTargetAcceptionRatioCh

						#afterRatio = Helpers.getAverageDeviationRatioAll()

						#R.users[teamleader._id].acceptions++
						#R.users[teamleader._id].targetAcceptionRatio = R.users[teamleader._id].acceptions / R.users[teamleader._id].targetPeriod
						#R.users[changeable._id].acceptions--
						#R.users[changeable._id].targetAcceptionRatio = R.users[changeable._id].acceptions / R.users[changeable._id].targetPeriod

						# Tausche, wenn die Differenz der Tausch-Kandidaten geringer wird
						if afterRatioDifference < beforeRatioDifference
						#if afterRatio < beforeRatio
							for waypoint in changeable.way
								Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId
								Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, true

							# Wenn Änderung vollzogen, sortiere neu und beginne Optimierung von vorne
							doRestart = true
							break

				# Wenn letzer Teamleiter erreicht, beende Optimierung
				if index == teamleadersByDeviationRatio.length - 1 then endReached = true

	optimizeMaxReachedTeamleaders: ->

		# Alle Teams ohne Teilnehmer durchlaufen
		for team in R.teams.filter((team) -> team.participants.length == 0)

			nextTeam = false

			# Mögliche beworbene Teamleiter durchlaufen
			for teamleader, index in team.pending when !nextTeam && (teamleader.teamleader || teamleader.substituteTeamleader)
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
						nextTeam = true
						break

	setMinParticipants: ->

		teamsWithTeamleader = R.teams.filter (team) -> team.participants.length > 0

		# TODO: hinterher prüfen, ob sortierung zu besseren ergebnissen führen würde
		#teamsWithTeamleader = teamsWithTeamleader.sort (a, b) -> a.pending.length - b.pending.length

		for team in teamsWithTeamleader when team.participants.length < team.min && team.pending.length > 0
			allRequests = []

			# Bewerber heraussuchen, die noch nicht am Maximum für diese Zeitperiode oder diesen Tag sind
			for user in team.pending
				maxReached = Helpers.getMaxReachedPeriod user
				maxReachedDay = Helpers.getMaxReachedDay user, team

				if !maxReached && !maxReachedDay
					allRequests.push user

			# User mit der niedrigsten Ratio auswählen
			if allRequests.length >= team.min - 1
				allRequests = allRequests.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio

				# Bewerber einteilen, bis Team Minimum erreicht ist
				for request in allRequests when team.participants.length < team.min
					Helpers.pendingToParticipants team.shiftId, team._id, request._id, false

					R.setParticipants.push request

	optimizeParticipants: ->

		endReached = false

		while !endReached
			averageRatio = Helpers.getAverageRatioAll()

			# Sortiere alle Bewerber nach deren Abstand zur durchschnittlichen Ratio absteigend
			participantsByDeviationRatio = R.setParticipants.sort (a, b) ->
				a = R.users[a._id]
				b = R.users[b._id]
				Math.abs(averageRatio - b.targetAcceptionRatio) - Math.abs(averageRatio - a.targetAcceptionRatio)

			# Wenn kein eingeteilten Bewerber gefunden wurden, brich direkt ab
			if participantsByDeviationRatio.length == 0 then endReached = true

			restartOptimizing = false

			# Durchlaufe alle eingeteilten Bewerber und versuche zu optimieren
			for participant, index in participantsByDeviationRatio when !restartOptimizing

				# Suche alle möglichen Tausch-Kandidaten
				changeables = Helpers.searchChangeables participant._id

				# Sortiere Tausch-Kandidaten für bestmöglichen Tausch
				changeables = changeables.sort (a, b) ->
					a = R.users[a._id]
					b = R.users[b._id]
					p = R.users[participant._id]
					Math.abs(p.targetAcceptionRatio - a.targetAcceptionRatio) - Math.abs(p.targetAcceptionRatio - b.targetAcceptionRatio)

				# Durchlaufe die Tausch-Kandidaten
				for changeable, cIndex in changeables
					maxReached = Helpers.getMaxReachedPeriod changeable

					if !maxReached
						# Prüfe, ob Tauschen Sinn macht
						#beforeRatio = Helpers.getAverageDeviationRatioAll()

						beforeRatioDifference = Math.abs R.users[participant._id].targetAcceptionRatio - R.users[changeable._id].targetAcceptionRatio
						newTargetAcceptionRatioTl = (R.users[participant._id].acceptions - 1) / R.users[participant._id].targetPeriod
						newTargetAcceptionRatioCh = (R.users[changeable._id].acceptions + 1) / R.users[changeable._id].targetPeriod
						afterRatioDifference = Math.abs newTargetAcceptionRatioTl - newTargetAcceptionRatioCh

						#R.users[participant._id].acceptions--
						#R.users[participant._id].targetAcceptionRatio = newTargetAcceptionRatioTl
						#R.users[changeable._id].acceptions++
						#R.users[changeable._id].targetAcceptionRatio = newTargetAcceptionRatioCh

						#afterRatio = Helpers.getAverageDeviationRatioAll()

						#R.users[participant._id].acceptions++
						#R.users[participant._id].targetAcceptionRatio = R.users[participant._id].acceptions / R.users[participant._id].targetPeriod
						#R.users[changeable._id].acceptions--
						#R.users[changeable._id].targetAcceptionRatio = R.users[changeable._id].acceptions / R.users[changeable._id].targetPeriod

						# Tausche, wenn die Differenz der Tausch-Kandidaten geringer wird
						if afterRatioDifference < beforeRatioDifference
						#if afterRatio < beforeRatio
							for waypoint in changeable.way
								Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId

							for waypoint in changeable.way
								#console.log 'pe2pa: ' + R.users[waypoint.toId].name
								Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, false

							#console.log 'AAA'

							# Wenn Änderung vollzogen, sortiere neu und beginne Optimierung von vorne
							restartOptimizing = true
							break
						else
							# TODO: Überprüfen, ob Tausch trotzdem einen Vorteil bringen würde (für die nicht-Teamleiter)

				# Wenn letzer Teilnehmer erreicht, beende Optimierung
				if index == participantsByDeviationRatio.length - 1 then endReached = true

	optimizeMaxReachedParticipants: ->

		# Alle Teams durchlaufen, die nur einen Teamleiter haben
		for team in R.teams.filter((team) -> team.participants.length == 1)
			i = 0
			doneWaypoints = []
			repeatParticipants = true
			team = R.teams.filter((t) -> t._id == team._id && t.shiftId == team.shiftId)[0]
			doneParticipants = []
			userChangeables = []

			# Mögliche beworbene Teilnehmer durchlaufen
			for participant, index in team.pending when !repeatParticipants
				maxReachedDay = Helpers.getMaxReachedDay participant, team
				maxReachedPeriod = Helpers.getMaxReachedPeriod participant

				if !maxReachedDay && !maxReachedPeriod
					Helpers.pendingToParticipants team.shiftId, team._id, participant._id, false
					doneParticipants.push participant

			return if team.participants.length >= team.min

			while repeatParticipants
				repeatParticipants = false
				foundUserCounts = {}

				# In wie vielen Wegen ist er Teilnehmer bzw. Tausch-Kandidat
				participantWayCount = []
				changeableWayCount = []

				# Mögliche beworbene Teilnehmer durchlaufen
				for participant, index in team.pending when !repeatParticipants
					maxReachedDay = Helpers.getMaxReachedDay participant, team
					maxReachedPeriod = Helpers.getMaxReachedPeriod participant

					# Tausch-Kandidaten heraussuchen
					changeables = Helpers.searchChangeables participant._id

					# Wenn User bereits das Maximum dieses Tages erreicht hat, nur Schichten an diesem Tag prüfen
					if maxReachedDay
						changeables = changeables.filter (changeable) ->
							fTeam = (R.teams.filter (t) -> t._id == changeable.way[0].teamId && t.shiftId == changeable.way[0].shiftId)[0]
							fTeam.date == team.date

					# Anzahl der Tausch-Kandidaten ermitteln für den Participant
					if changeables.length != 0 then participantWayCount.push userId: participant._id, count: changeables.length

					for changeable in changeables
						# Anzahl der möglichen Tausch-Möglichkeiten mit diesem Tausch-Kandidaten erhöhen
						count = 1
						for cChangeable in changeableWayCount when cChangeable.userId == changeable._id
							count += cChangeable.count

						changeableWayCount = changeableWayCount.filter (c) -> c.userId != changeable._id
						changeableWayCount.push userId: changeable._id, count: count

						userChangeables.push
							userId: participant._id
							toId: changeable._id
							way: changeable.way

				# Wenn zu wenig Bewerber übrig sind, nächstes Team versuchen
				break if participantWayCount.length + team.participants.length < team.min

				# Bewerber mit den wenigsten Tauschmöglichkeiten raussuchen
				participant = R.users[participantWayCount.sort((a, b) -> a.count - b.count)[0].userId]
				userChangeables = userChangeables.filter (changeable) -> changeable.userId == participant._id

				# Den Changeable mit der niedrigsten changeableWayCount auswählen
				changeableWayCount = changeableWayCount.sort (a, b) -> a.count - b.count

				for changeable in changeableWayCount when userChangeables.filter((uChangeable) -> uChangeable.toId == changeable.userId).length == 1
					for waypoint in userChangeables.filter((fChangeable) -> changeable.userId == fChangeable.toId)[0].way
						Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId

					for waypoint in userChangeables.filter((fChangeable) -> changeable.userId == fChangeable.toId)[0].way
						Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, false
						doneWaypoints.push waypoint

					break

				# Teilnehmer dank des gewonnenen Platzes in dieser Schicht einteilen
				Helpers.pendingToParticipants team.shiftId, team._id, participant._id, false
				doneParticipants.push participant

				if team.participants.length > team.min
					# Nächster Bewerber
					repeatParticipants = true

			# Zurücksetzen, wenn nicht genug Teilnehmer eingeteilt werden konnten
			if team.participants.length < team.min
				doneWaypoints.reverse()

				for participant in doneParticipants
					Helpers.participantsToPending team.shiftId, team._id, participant._id

				for waypoint in doneWaypoints
					Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.toId

				for waypoint in doneWaypoints
					Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.fromId, false

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
