export Scheduler =

	pendingToParticipants: (shiftId, teamId, user) ->

		# User verschieben
		for team in R.teams when team.shiftId == shiftId && team._id == teamId
			team['participants'].push user

			for userItem, index in team['pending'] when userItem._id == user._id
				team['pending'].splice index, 1
				break

		# Acceptions erhöhen
		R.users[user._id].acceptions += 1

		# Schicht in confirmations Array aufnehmen
		if user.thisTeamleader
			R.users[user._id].tlConfirmations.push shiftId: shiftId, teamId: teamId
		else
			R.users[user._id].confirmations.push shiftId: shiftId, teamId: teamId

		# Ratio errechnen
		R.users[user._id].targetAcceptionRatio = R.users[user._id].acceptions / R.users[user._id].targetPeriod

	participantsToPending: (shiftId, teamId, user) ->

		# User verschieben
		for team in R.teams when team.shiftId == shiftId && team._id == teamId
			team['pending'].push user

			for userItem, index in team['participants'] when userItem._id == user._id
				team['participants'].splice index, 1
			break

		# Acceptions senken
		R.users[user._id].acceptions -= 1

		# Schicht aus teamleader confirmations Array entfernen
		for tlConfirmation, index in R.users[user._id].tlConfirmations
			if tlConfirmation.shiftId = shiftId && tlConfirmation.teamId = teamId
				R.users[user._id].tlConfirmations.splice index, 1

		# Schicht aus confirmations Array entfernen
		for confirmation, index in R.users[user._id].confirmations
			if confirmation.shiftId = shiftId && confirmation.teamId = teamId
				R.users[user._id].confirmations.splice index, 1

		# Ratio errechnen
		R.users[user._id].targetAcceptionRatio = R.users[user._id].acceptions / R.users[user._id].target

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
						# User anlegen
						user.targetPeriod = Random.choice [1, 2, 3] # TODO: CHANGE get for this tag
						user.maxPeriod = 1 # user.targetPeriod + 1 # TODO: CHANGE get for this tag
						user.maxDay = user.targetPeriod + 1 # TODO: CHANGE get for this tag
						user.acceptions = 0
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
					team.start = shift.start
					team.end = shift.end
					team.requestAmount = team.pending.length

					if team.requestAmount >= team.min # TODO: als wahrscheinlichkeit berücksichten
						R.teams.push team

		# Teams nach Anzahl der Bewerbungen absteigend sortieren
		teams = R.teams.sort (a, b) -> b.requestAmount - a.requestAmount

	setTeamleaders: ->

		for team in R.teams
			teamsWithTls = team.pending.filter (user) -> user.teamleader || user.substituteTeamleader

			if teamsWithTls.length > 0
				thisTeamleader = false
				allTeamleaders = []
				allSubTeamleaders = []

				# Teamleiter heraussuchen, die noch nicht am Maximum sind und noch keine
				# angenommene Bewerbung an diesem Tag haben
				for user in teamsWithTls
					maxReached = R.users[user._id].acceptions >= R.users[user._id].maxPeriod
					maxReachedDay = false

					for cTeam in R.users[user._id].confirmations
						thisDate = (R.shifts.filter (shift) -> shift._id == cTeam.shiftId)[0].date
						confirmationsThisDay = []

						# Alle angenommenen Bewerbungen dieses Tages zusammenfassen
						for fTeam in R.users[user._id].confirmations
							if (R.shifts.filter (shift) -> shift._id == fTeam.shiftId)[0].date == thisDate
								if (confirmationsThisDay.filter (confirmation) -> confirmation.shiftId == fTeam.shiftId).length == 0
									confirmationsThisDay.push fTeam

						# Anzahl der angenommenen Bewerbungen und ggf. auf Doppelschicht prüfen
						if confirmationsThisDay.length == 1
							if user.maxDay == 1
								if !R.doubleShiftAllowed
									maxReachedDay = true
								else if R.shifts[confirmationsThisDay[0].shiftId].start != cTeam.end && R.shifts[confirmationsThisDay[0].shiftId].end != cTeam.start
									maxReachedDay = true
						else if confirmationsThisDay.length > 1 && confirmationsThisDay.length >= user.maxDay
							maxReachedDay = true

					if !maxReached && !maxReachedDay
						if user.teamleader
							allTeamleaders.push user
						else if user.substituteTeamleader
							allSubTeamleaders.push user

				# User mit der niedrigsten Ratio auswählen
				if allTeamleaders.length > 0
					allTeamleaders.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio
					thisTeamleader = allTeamleaders[0]
				else if allSubTeamleaders.length > 0
					# Wenn kein Teamleiter vorhanden ist, suche nach Ersatz-Teimleitern
					allSubTeamleaders.sort (a, b) -> R.users[a._id].targetAcceptionRatio - R.users[b._id].targetAcceptionRatio
					thisTeamleader = allSubTeamleaders[0]

				if thisTeamleader
					# Teamleiter einteilen, wenn vorhanden
					Scheduler.pendingToParticipants team.shiftId, team._id, thisTeamleader

					R.setTeamleaders[thisTeamleader._id] = thisTeamleader

	saveToDB: ->

		for team in R.teams
			Shifts.update _id: team.shiftId, 'teams._id': team._id,
				$set: 'teams.$': team

	searchChangeables: (user) ->

		foundUsers = []
		runCondition = true
		i = 0

		# Aktuellen User in foundUsers aufnehmen
		foundUsers.push _id: user._id, way: []

		while runCondition
			if foundUsers.length <= i
				runCondition = false
			else
				foundUser = foundUsers[i]

				for team in R.users[foundUser._id].confirmations
					team = (R.teams.filter (t) -> t._id == team.teamId && t.shiftId == team.shiftId)[0]

					# User in foundUsers aufnehmen, wenn noch nicht geschehen
					for rUser in team.pending when rUser._id not in foundUsers
						foundUsers.push
							_id: rUser._id
							way: foundUser.way.concat [
								shiftId: shift._id
								teamId: team._id
								fromId: rUser._id
								toId: foundUser._id
							]
					i++
		foundUsers

	searchTeamleaderChangeables: (user) ->

		foundUsers = []
		runCondition = true
		i = 0

		# Aktuellen User in foundUsers aufnehmen
		foundUsers.push _id: user._id, way: []

		while runCondition
			if foundUsers.length <= i
				runCondition = false
			else
				foundUser = foundUsers[i]

				for team in R.users[foundUser._id].tlConfirmations
					team = (R.teams.filter (t) -> t._id == team.teamId && t.shiftId == team.shiftId)[0]

					for rUser in team.pending when rUser.teamleader || rUser.substituteTeamleader
						# User in foundUsers aufnehmen, wenn noch nicht geschehen
						if rUser._id not in foundUsers
							foundUsers.push
								_id: rUser._id
								way: foundUser.way.concat [
									shiftId: shift._id
									teamId: team._id
									fromId: rUser._id
									toId: foundUser._id
								]
					i++
		foundUsers

	countAbandonedTeamsTl: ->

		count = 0

		# Teams zählen, die einen möglichen Teamleiter haben
		for team in R.teams
			hasTeamleader = false

			for user in team.participants when user.teamleader || user.substituteTeamleader
				hasTeamleader = true

			if !hasTeamleader
				count++
		count

	countAbandonedTeamsUsers: ->

		# Teams zählen, die weniger angenommene Bewerbungen haben, als notwendig
		(R.teams.filter (team) -> team.participants.length < team.min).length

	getAverageDeviationRatio: ->

		sumRatio = 0
		averageRatio = 0
		sumDeviation = 0

		for userId in Object.keys R.users
			sumRatio += R.users[userId].targetAcceptionRatio

		averageRatio = sumRatio / Object.keys(R.users).length

		for userId in Object.keys R.users
			if R.users[userId].targetAcceptionRatio > averageRatio
				sumDeviation += R.users[userId].targetAcceptionRatio - averageRatio
			else if R.users[userId].targetAcceptionRatio < averageRatio
				sumDeviation += averageRatio - R.users[userId].targetAcceptionRatio

		sumDeviation / Object.keys(R.users).length
