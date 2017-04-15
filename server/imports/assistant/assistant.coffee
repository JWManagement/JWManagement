import { Helpers } from './helpers.coffee'
import { R } from './variables.coffee'



# TODO: a1 nicht nur tauschen sondern auch setzen (bei team.pending < team.max && user.acceptions < user.targetPeriod)
# TODO: a1 über changeables, mit der Prüfung in searchChangeables das keiner dafür ausgetragen wird

# TODO: a2 nicht nur tauschen sondern auch rausnehmen (bei team.participants > team.min && user.acceptions > user.targetPeriod)
# TODO: a2 lieber über changeables, mit der Prüfung in searchChangeables das keiner dafür eingetragen wird

# TODO: a3 Funktion: getBestChangeable() geht drei Varianten durch und liefert sortiertes searchChangeable; es muss acceptions im User eingetragen werden
# TODO: a3 dann neu berechent, dann searchChangeables angereichert & dann sortiert (und dann wieder ausgetragen werden?)

#--
# TODO: b1 nicht nur tauschen sondern auch setzen (bei team.pending < team.max && user.acceptions < user.targetPeriod)
# TODO: b1 signin wenn bester changeable % < 100, singout wenn bester changeable % > 100;

# TODO: b2 OpportunitiesToSignIn  (change and signin) && OpportunitiesToSignOut (change and signout) --> [signout für optimizemaxreached]
# TODO: b2 mit opportunities zwei Objekte in einem Objekt zurückgeben? dann zwei lokalen variablen zuweisen

#--

# TODO: c1 am Ende auffüllen und changen

# TODO: c2 dann abspeichern und wieder zurücksetzen
# TODO: c2 dann TeamReset, jedes Team raus, am Ende auffüllen und abgleichen
# TODO: c2 bei Besserung abspeichern, Teil zurücksetzen und wieder von vorne

#------

# TODO: Ende: otimizeAll mit searchChangeables für Teamleitereinteilung stehen lassen!


export Assistant =

	resetAll: (projectId, date) ->
		shiftIds = []

		week = Weeks.findOne
			projectId: projectId
			date: date

		for day in week.days
			for shift in day.shifts
				shiftIds.push shift

		shifts = Shifts.find _id: $in: shiftIds

		for shift in shifts.fetch()
			for team in shift.teams
				for user in team.participants
					user.thisTeamleader = false
					user.checked = false

					Shifts.update _id: shift._id, 'teams._id': team._id,
						$pull:
							'teams.$.participants': _id: user._id
							'teams.$.pending': _id: user._id
							'teams.$.declined': _id: user._id

					Shifts.update _id: shift._id, 'teams._id': team._id,
						$addToSet: 'teams.$.pending': user
		true

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

		true

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
						user.targetPeriod = 5 # Random.choice [1, 2, 3] # TODO: CHANGE get for this tag
						user.maxPeriod = 7 # user.targetPeriod + 1 # TODO: CHANGE get for this tag
						user.maxDay = 1 # TODO: CHANGE get for this tag
						user.acceptions = acceptions
						user.doubleShiftAllowed = true
						user.targetAcceptionRatio = user.acceptions / user.targetPeriod
						user.requests = [{shiftId: shift._id, teamId: team._id}]
						# TODO: Prüfen ob tlConfirmations oder partConfirmations benutzt wird
						user.allConfirmations = []
						user.tlConfirmations = []
						user.partConfirmations = []
						R.users[user._id] = user
		true

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
					team.max = 8

					if team.requestAmount >= team.min # TODO: als wahrscheinlichkeit berücksichten
						R.teams.push team

		# Teams nach Anzahl der Bewerbungen absteigend sortieren
		R.teams = R.teams.sort (a, b) -> b.requestAmount - a.requestAmount

	calculateToMax: ->
		# <---- NEU ---->
		@setMoreParticipants()
		@optimizeAll()
		@setMoreParticipants()
		@optimizeAll()
		@setMoreParticipants()
		@optimizeAll()

		true

	calculateToMaxWithLogs: ->
		# <---- NEU ---->
		console.log '> setMoreParticipants 1'
		@setMoreParticipants()
		@optimizeAll()
		Helpers.log()

		console.log '> setMoreParticipants 2'
		@setMoreParticipants()
		@optimizeAll()
		Helpers.log()

		console.log '> setMoreParticipants 3'
		@setMoreParticipants()
		@optimizeAll()
		Helpers.log()

		true

	calculateToMin: ->

		@setTeamleaders()
		@optimizeAll()

		@setTeamleaders()
		@optimizeMaxReachedTeamleaders()
		@optimizeAll()

		@setMinParticipants()
		@optimizeAll()
		@setMinParticipants()
		@optimizeMaxReachedParticipants()
		@optimizeAll()

		@setMinParticipants()
		@optimizeMaxReachedParticipants()

		@optimizeAll()

		true

	calculateToMinWithLogs: ->

		console.log '> setTeamleaders'
		@setTeamleaders()
		Helpers.log()

		console.log '> optimizeAll'
		@optimizeAll()
		Helpers.log()

		##

		console.log '>> setTeamleaders'
		@setTeamleaders()
		Helpers.log()

		console.log '>> optimizeMaxReachedTeamleaders'
		@optimizeMaxReachedTeamleaders()
		Helpers.log()

		console.log '>> optimizeAll'
		@optimizeAll()
		Helpers.log()

		##

		console.log '>>> setMinParticipants'
		@setMinParticipants()
		Helpers.log()

		console.log '>>> optimizeAll'
		@optimizeAll()
		Helpers.log()

		console.log '>>>> setMinParticipants'
		@setMinParticipants()
		Helpers.log()

		console.log '>>>> optimizeMaxReachedParticipants'
		@optimizeMaxReachedParticipants()
		Helpers.log()

		console.log '>>>> optimizeAll'
		@optimizeAll()
		Helpers.log()

		##

		console.log '>>>> setMinParticipants'
		@setMinParticipants()
		Helpers.log()

		console.log '>>>> optimizeMaxReachedParticipants'
		@optimizeMaxReachedParticipants()
		Helpers.log()

		##

		console.log '>>>>> optimizeAll'
		@optimizeAll()
		Helpers.log()

		true

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
					maxReached = Helpers.getMaxReachedPeriod user._id
					maxReachedDay = Helpers.getMaxReachedDay user._id, team

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
		true

	optimizeMaxReachedTeamleaders: ->

		# Alle Teams ohne Teilnehmer durchlaufen
		for team in R.teams.filter((team) -> team.participants.length == 0)

			nextTeam = false

			# Mögliche beworbene Teamleiter durchlaufen
			for teamleader in team.pending when !nextTeam && (teamleader.teamleader || teamleader.substituteTeamleader)
				teamleaderChangeables = Helpers.searchChangeables teamleader._id
				maxReachedDay = Helpers.getMaxReachedDay teamleader._id, team
				doubleShift = Helpers.getDoubleShiftOnDay teamleader._id, team.date

				# TODO: Doppelschichten mit berücksichtigen. Dafür beide Schichten tauschen, und hinterher auch wieder beide Schichten eintragen.
				continue if doubleShift

				# Wenn User bereits das Maximum dieses Tages erreicht hat, nur Schichten an diesem Tag prüfen
				if maxReachedDay
					teamleaderChangeables = teamleaderChangeables.filter (changeable) ->
						fTeam = (R.teams.filter (t) -> t._id == changeable.way[0].teamId && t.shiftId == changeable.way[0].shiftId)[0]
						fTeam.date == team.date

				teamleaderChangeables = teamleaderChangeables.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio

				# Mögliche Tausch-Kandidaten für diesen Teamleiter heraussuchen
				for changeable in teamleaderChangeables
					# Tausch in den anderen Schichten vornehmen
					for waypoint in changeable.way
						Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId
					for waypoint in changeable.way
						Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, waypoint.tlChange

					# Teamleiter dank des gewonnenen Platzes in dieser Schicht einteilen
					Helpers.pendingToParticipants team.shiftId, team._id, teamleader._id, true

					# Nächstes Team
					nextTeam = true
					break
		true

	setMinParticipants: ->

		teamsWithTeamleader = R.teams.filter (team) -> team.participants.length > 0

		for team in teamsWithTeamleader when team.participants.length < team.min && team.pending.length > 0
			allRequests = []

			# Bewerber heraussuchen, die noch nicht am Maximum für diese Zeitperiode oder diesen Tag sind
			for user in team.pending
				maxReached = Helpers.getMaxReachedPeriod user._id
				maxReachedDay = Helpers.getMaxReachedDay user._id, team

				if !maxReached && !maxReachedDay
					allRequests.push user

			# User mit der niedrigsten Ratio auswählen
			if allRequests.length >= team.min - 1
				allRequests = allRequests.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio

				# Bewerber einteilen, bis Team Minimum erreicht ist
				for request in allRequests when team.participants.length < team.min
					Helpers.pendingToParticipants team.shiftId, team._id, request._id, false
		true

	optimizeAll: ->

		endReached = false

		while !endReached

			averageRatio = Helpers.getAverageRatioAll()
			restartOptimizing = false
			# Sortiere alle Teilnehmer (mit angenommener Schicht) nach deren Abstand zur durchschnittlichen Ratio absteigend
			setParticipants = Object.keys(R.users).map((userId) -> R.users[userId]).filter (user) -> user.allConfirmations.length > 0
			participantsByDeviationRatio = setParticipants.sort (a, b) ->
				Math.abs(averageRatio - b.targetAcceptionRatio) - Math.abs(averageRatio - a.targetAcceptionRatio)

			# Wenn kein eingeteilten Bewerber gefunden wurden, brich direkt ab
			if participantsByDeviationRatio.length == 0 then endReached = true

			# Durchlaufe alle eingeteilten Bewerber und versuche zu optimieren
			for participant, index in participantsByDeviationRatio when !restartOptimizing
				# Suche alle möglichen Tausch-Kandidaten

				changeables = Helpers.searchChangeables participant._id

				# Sortiere Tausch-Kandidaten für bestmöglichen Tausch
				# (der changeable, der die größte Differenz in targetAcceptionRatio zu dem participant hat)
				changeables = changeables.sort (a, b) ->
					a = R.users[a._id]
					b = R.users[b._id]
					p = R.users[participant._id]
					Math.abs(p.targetAcceptionRatio - b.targetAcceptionRatio) - Math.abs(p.targetAcceptionRatio - a.targetAcceptionRatio)

				# Durchlaufe die Tausch-Kandidaten
				for changeable in changeables
					# Prüfe, ob Tauschen Sinn macht
					beforeRatioDifference = Math.abs R.users[participant._id].targetAcceptionRatio - R.users[changeable._id].targetAcceptionRatio
					newTargetAcceptionRatioPart = (R.users[participant._id].acceptions - 1) / R.users[participant._id].targetPeriod
					newTargetAcceptionRatioCh = (R.users[changeable._id].acceptions + 1) / R.users[changeable._id].targetPeriod
					afterRatioDifference = Math.abs newTargetAcceptionRatioPart - newTargetAcceptionRatioCh

					# Tausche, wenn die Differenz der Tausch-Kandidaten geringer wird
					if afterRatioDifference < beforeRatioDifference
						for waypoint in changeable.way
							Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId

						for waypoint in changeable.way
							Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, waypoint.tlChange

						# Wenn Änderung vollzogen, sortiere neu und beginne Optimierung von vorne
						restartOptimizing = true
						break
					else
						# TODO: Überprüfen, ob Tausch trotzdem einen Vorteil bringen würde (für die nicht-Teamleiter)

				# Wenn letzer Teilnehmer erreicht, beende Optimierung
				if index >= participantsByDeviationRatio.length - 1 then endReached = true
		true

	optimizeMaxReachedParticipants: ->

		# Alle Teams durchlaufen, die nur einen Teamleiter haben
		for team in R.teams.filter((team) -> team.participants.length == 1)
			i = 0
			doneWaypoints = []
			repeatUsers = true
			team = R.teams.filter((t) -> t._id == team._id && t.shiftId == team.shiftId)[0]
			doneParticipants = []
			userChangeables = []

			# Mögliche beworbene Teilnehmer durchlaufen
			for user in team.pending
				maxReachedDay = Helpers.getMaxReachedDay user._id, team
				maxReachedPeriod = Helpers.getMaxReachedPeriod user._id

				if !maxReachedDay && !maxReachedPeriod
					Helpers.pendingToParticipants team.shiftId, team._id, user._id, false
					doneWaypoints.push type: 'pendingToParticipants', waypoint:
						shiftId: team.shiftId
						teamId: team._id
						fromId: ''
						toId: user._id

			continue if team.participants.length >= team.min

			while repeatUsers
				repeatUsers = false
				foundUserCounts = {}

				# In wie vielen Wegen ist er Teilnehmer bzw. Tausch-Kandidat
				userWayCount = []
				changeableWayCount = []

				# Mögliche beworbene Teilnehmer durchlaufen
				for user in team.pending
					maxReachedDay = Helpers.getMaxReachedDay user._id, team
					maxReachedPeriod = Helpers.getMaxReachedPeriod user._id
					doubleShift = Helpers.getDoubleShiftOnDay user._id, team.date

					# TODO: Doppelschichten mit berücksichtigen. Dafür beide Schichten tauschen, und hinterher auch wieder beide Schichten eintragen.
					continue if doubleShift

					# Tausch-Kandidaten heraussuchen
					changeables = Helpers.searchChangeables user._id

					# Wenn User bereits das Maximum dieses Tages erreicht hat, nur Schichten an diesem Tag prüfen
					if maxReachedDay
						changeables = changeables.filter (changeable) ->
							fTeam = (R.teams.filter (t) -> t._id == changeable.way[0].teamId && t.shiftId == changeable.way[0].shiftId)[0]
							fTeam.date == team.date

					# Anzahl der Tausch-Kandidaten ermitteln für den User
					if changeables.length != 0 then userWayCount.push userId: user._id, count: changeables.length

					for changeable in changeables
						# Anzahl der möglichen Tausch-Möglichkeiten mit diesem Tausch-Kandidaten erhöhen
						count = 1
						for cChangeable in changeableWayCount when cChangeable.userId == changeable._id
							count += cChangeable.count

						changeableWayCount = changeableWayCount.filter (c) -> c.userId != changeable._id
						changeableWayCount.push userId: changeable._id, count: count

						userChangeables.push
							userId: user._id
							toId: changeable._id
							way: changeable.way

				# Wenn zu wenig Bewerber übrig sind, nächstes Team versuchen
				break if userWayCount.length + team.participants.length < team.min

				# Bewerber mit den wenigsten Tauschmöglichkeiten raussuchen
				participant = R.users[userWayCount.sort((a, b) -> a.count - b.count)[0].userId]
				userChangeables = userChangeables.filter (changeable) -> changeable.userId == participant._id

				# Den Changeable mit der niedrigsten changeableWayCount auswählen
				changeableWayCount = changeableWayCount.sort (a, b) -> a.count - b.count
				for changeable in changeableWayCount when userChangeables.filter((uChangeable) -> uChangeable.toId == changeable.userId).length > 0
					way = userChangeables.filter((fChangeable) -> changeable.userId == fChangeable.toId)[0].way
					for waypoint in way
						Helpers.participantsToPending waypoint.shiftId, waypoint.teamId, waypoint.fromId
						doneWaypoints.push type: 'participantsToPending', waypoint: waypoint

					for waypoint in way
						Helpers.pendingToParticipants waypoint.shiftId, waypoint.teamId, waypoint.toId, waypoint.tlChange
						doneWaypoints.push type: 'pendingToParticipants', waypoint: waypoint
					break

				# Teilnehmer dank des gewonnenen Platzes in dieser Schicht einteilen
				Helpers.pendingToParticipants team.shiftId, team._id, participant._id, false
				doneWaypoints.push type: 'pendingToParticipants', waypoint:
					shiftId: team.shiftId
					teamId: team._id
					fromId: ''
					toId: participant._id

				if team.participants.length < team.min
					# Nächster Bewerber
					repeatUsers = true
				else

			# Zurücksetzen, wenn nicht genug Teilnehmer eingeteilt werden konnten
			if team.participants.length < team.min
				doneWaypoints.reverse()

				for w in doneWaypoints
					if w.type == 'participantsToPending' then Helpers.pendingToParticipants w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.fromId, w.waypoint.tlChange
					if w.type == 'pendingToParticipants' then Helpers.participantsToPending w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.toId
		true

	setMoreParticipants: ->
		# <---- NEU ---->

		teamsWithMin = R.teams.filter (team) -> team.participants.length >= team.min

		for team in teamsWithMin when team.pending.length > 0
			allRequests = []
			# Bewerber heraussuchen, die noch nicht am Maximum für diese Zeitperiode oder diesen Tag sind
			for user in team.pending
				maxReached = Helpers.getMaxReachedPeriod user._id
				maxReachedDay = Helpers.getMaxReachedDay user._id, team
				if !maxReached && !maxReachedDay
					allRequests.push user

			# User mit der niedrigsten Ratio auswählen
			if allRequests.length >= 1
				allRequests = allRequests.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio

				# Bewerber einteilen, bis Team Maximum erreicht ist oder es sich nicht mehr lohnt
				for request in allRequests when team.participants.length < team.max && R.users[request._id].targetAcceptionRatio < 1
					Helpers.pendingToParticipants team.shiftId, team._id, request._id, false
		true

	optimizeByTeamReset: ->
		# <---- NEU ---->

		# Schichten der ersten Einteilung auffüllen über Minimum
		R.doneWaypoints = []
		R.finalWaypointsToMax = []

		@calculateToMax()

		# Ergebnis absperichern
		R.finalWaypointsToMax = JSON.parse(JSON.stringify(R.doneWaypoints))
		backup =
			averageDeviationRatio: Helpers.getAverageDeviationRatioAll()
			abandonedTeamsTl: Helpers.countAbandonedTeamsTl()
			abandonedTeamsUsers: Helpers.countAbandonedTeamsUsers()
			countAbandonedTeamsAll: Helpers.countAbandonedTeamsTl() + Helpers.countAbandonedTeamsUsers()
		Helpers.log()

		# Schichten wieder auf Minimum setzen
		R.doneWaypoints.reverse()
		for w in R.doneWaypoints
			if w.type == 'participantsToPending' then Helpers.pendingToParticipants w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.fromId, w.waypoint.tlChange
			if w.type == 'pendingToParticipants' then Helpers.participantsToPending w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.toId

		if 0 == Helpers.countAbandonedTeamsTl() + Helpers.countAbandonedTeamsUsers() then return
		doRestart = true

		while doRestart
			doRestart = false
			for team in R.teams when team.participants.length > 0
				R.doneWaypoints = []
				R.savedWaypointsToMin = []
				R.savedWaypointsToMax = []

				team['savedParticipants'] = []
				team['savedPending'] = []

				for user in team.pending
					team['savedPending'].push user

				for user in team.participants
					team['savedParticipants'].push user
					Helpers.participantsToPending team.shiftId, team._id, user._id

				team['participants'] = []
				team['pending'] = []

				# TODO: nicht bei beiden optimize all, sondern nur das nötige
				@calculateToMin()

				# Schicht wieder einsetzen und wieder mit ihr optimieren
				team['pending'] = team['savedParticipants'].concat(team['savedPending'])

				@calculateToMin()

				# Wegpunkte abspeichern
				R.savedWaypointsToMin = JSON.parse(JSON.stringify(R.doneWaypoints))
				R.doneWaypoints = []

				@calculateToMax()

				# Wegpunkte abspeichern
				R.savedWaypointsToMax = JSON.parse(JSON.stringify(R.doneWaypoints))
				R.doneWaypoints = []

				averageDeviationRatio = Helpers.getAverageDeviationRatioAll()
				countAbandonedTeamsAll = Helpers.countAbandonedTeamsTl() + Helpers.countAbandonedTeamsUsers()

				if countAbandonedTeamsAll < backup.countAbandonedTeamsAll || countAbandonedTeamsAll == backup.countAbandonedTeamsAll && averageDeviationRatio < backup.averageDeviationRatio
					# Bessere Einteilung übernehmen
					backup =
						averageDeviationRatio: Helpers.getAverageDeviationRatioAll()
						abandonedTeamsTl: Helpers.countAbandonedTeamsTl()
						abandonedTeamsUsers: Helpers.countAbandonedTeamsUsers()
						countAbandonedTeamsAll: Helpers.countAbandonedTeamsTl() + Helpers.countAbandonedTeamsUsers()
					Helpers.log()

					# Schichten wieder auf Minimum setzen
					R.finalWaypointsToMax = []
					R.finalWaypointsToMax = JSON.parse(JSON.stringify(R.savedWaypointsToMax))
					R.savedWaypointsToMax.reverse()
					for w in R.savedWaypointsToMax
						if w.type == 'participantsToPending' then Helpers.pendingToParticipants w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.fromId, w.waypoint.tlChange
						if w.type == 'pendingToParticipants' then Helpers.participantsToPending w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.toId

					doRestart = true
					break
				else
					# Schlechtere Einteilung rückgängig machen
					R.savedWaypointsToMax.reverse()
					for w in R.savedWaypointsToMax
						if w.type == 'participantsToPending' then Helpers.pendingToParticipants w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.fromId, w.waypoint.tlChange
						if w.type == 'pendingToParticipants' then Helpers.participantsToPending w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.toId

					R.savedWaypointsToMin.reverse()
					for w in R.savedWaypointsToMin
						if w.type == 'participantsToPending' then Helpers.pendingToParticipants w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.fromId, w.waypoint.tlChange
						if w.type == 'pendingToParticipants' then Helpers.participantsToPending w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.toId
		for w in R.finalWaypointsToMax
			if w.type == 'pendingToParticipants' then Helpers.pendingToParticipants w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.toId, w.waypoint.tlChange
			if w.type == 'participantsToPending' then Helpers.participantsToPending w.waypoint.shiftId, w.waypoint.teamId, w.waypoint.fromId, w.waypoint.tlChange

		true


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
				delete user.allConfirmations
				delete user.tlConfirmations
				delete user.partConfirmations

			for user in team.pending
				delete user.targetPeriod
				delete user.maxPeriod
				delete user.maxDay
				delete user.acceptions
				delete user.doubleShiftAllowed
				delete user.targetAcceptionRatio
				delete user.requests
				delete user.allConfirmations
				delete user.tlConfirmations
				delete user.partConfirmations

			shiftId = team.shiftId

			delete team.shiftId
			delete team.date
			delete team.start
			delete team.end
			delete team.requestAmount
			delete team.savedParticipants
			delete team.savedPending

			Shifts.update _id: shiftId, 'teams._id': team._id,
				$set: 'teams.$': team
		true
