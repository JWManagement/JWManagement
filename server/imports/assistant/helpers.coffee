import { R } from './variables.coffee'

export Helpers =

	pendingToParticipants: (shiftId, teamId, userId, teamleader) ->

		user = {}

		# User verschieben
		for team in R.teams when team.shiftId == shiftId && team._id == teamId

			# Participants prüfen
			for u in team.participants when u._id == userId
				console.log u.name + ' bereits in participants'
				return

			# Userdaten holen
			for u in team.pending when u._id == userId
				user = u
				user.thisTeamleader = teamleader
				break

			# Gefundenen user überprüfen
			if user == {}
				console.log u.name + ' nicht in pending gefunden'
				return
			else
				maxReachedDay = Helpers.getMaxReachedDay user, team
				maxReachedPeriod = Helpers.getMaxReachedPeriod user

				if maxReachedDay || maxReachedPeriod
					console.log u.name + ' bereits am Maximum'
					return

			team['participants'].push user

			for userItem, index in team['pending'] when userItem._id == userId
				team['pending'].splice index, 1
				break

		# Acceptions erhöhen
		R.users[userId].acceptions += 1

		# Schicht in confirmations Array aufnehmen
		if user.thisTeamleader
			R.users[userId].tlConfirmations.push shiftId: shiftId, teamId: teamId
		else
			R.users[userId].confirmations.push shiftId: shiftId, teamId: teamId

		# Ratio errechnen
		R.users[userId].targetAcceptionRatio = R.users[userId].acceptions / R.users[userId].targetPeriod

	participantsToPending: (shiftId, teamId, userId) ->

		user = {}

		# User verschieben
		for team in R.teams when team.shiftId == shiftId && team._id == teamId

			# Pending prüfen
			for u in team.pending when u._id == userId
				console.log u.name + ' bereits in pending'
				return

			# Userdaten holen
			for u in team.participants when u._id == userId
				user = u
				user.thisTeamleader = false
				break

			# Gefundenen user überprüfen
			if user == {}
				console.log u.name + ' nicht in participants gefunden'
				return

			team['pending'].push user

			for userItem, index in team['participants'] when userItem._id == userId
				team['participants'].splice index, 1
				break

		# Acceptions senken
		R.users[userId].acceptions -= 1

		# Schicht aus teamleader confirmations Array entfernen
		for tlConfirmation, index in R.users[userId].tlConfirmations
			if tlConfirmation.shiftId = shiftId && tlConfirmation.teamId = teamId
				R.users[userId].tlConfirmations.splice index, 1
				break

		# Schicht aus confirmations Array entfernen
		for confirmation, index in R.users[userId].confirmations
			if confirmation.shiftId = shiftId && confirmation.teamId = teamId
				R.users[userId].confirmations.splice index, 1
				break

		# Ratio errechnen
		R.users[userId].targetAcceptionRatio = R.users[userId].acceptions / R.users[userId].target

	searchChangeables: (userId) ->

		foundUsers = []
		runCondition = true
		i = 0

		# Aktuellen User in foundUsers aufnehmen
		foundUsers.push _id: userId, way: []

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
								fromId: foundUser._id
								toId: rUser._id
							]
					i++
		foundUsers

	searchTeamleaderChangeables: (userId) ->

		foundUsers = []
		runCondition = true
		i = 0

		# Aktuellen User in foundUsers aufnehmen
		foundUsers.push _id: userId, way: []

		while runCondition
			if foundUsers.length <= i
				runCondition = false
			else
				foundUser = foundUsers[i]

				# Alle Teams durchgehen, wo er schon als Teamleiter angenommen ist
				for team in R.users[foundUser._id].tlConfirmations
					team = (R.teams.filter (t) -> t._id == team.teamId && t.shiftId == team.shiftId)[0]

					for rUser in team.pending when (rUser.teamleader || rUser.substituteTeamleader) && !this.getMaxReachedDay rUser, team
						# User in foundUsers aufnehmen, wenn noch nicht geschehen
						if foundUsers.filter((foundUser) -> foundUser._id == rUser._id).length == 0
							foundUsers.push
								_id: rUser._id
								way: foundUser.way.concat [
									shiftId: team.shiftId
									teamId: team._id
									fromId: foundUser._id
									toId: rUser._id
								]
			i++

		foundUsers.splice 0, 1
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

	getAverageDeviationRatioTl: ->

		teamleaders = []
		sumDeviation = 0
		averageRatio = this.getAverageRatioTl()

		for userId in Object.keys(R.users) when R.users[userId].teamleader || R.users[userId].substituteTeamleader
			teamleaders.push R.users[userId]

			if R.users[userId].targetAcceptionRatio > averageRatio
				sumDeviation += R.users[userId].targetAcceptionRatio - averageRatio
			else if R.users[userId].targetAcceptionRatio < averageRatio
				sumDeviation += averageRatio - R.users[userId].targetAcceptionRatio

		sumDeviation / Object.keys(teamleaders).length

	getAverageDeviationRatioAll: ->

		sumDeviation = 0
		averageRatio = this.getAverageRatioAll()

		for userId in Object.keys R.users
			if R.users[userId].targetAcceptionRatio > averageRatio
				sumDeviation += R.users[userId].targetAcceptionRatio - averageRatio
			else if R.users[userId].targetAcceptionRatio < averageRatio
				sumDeviation += averageRatio - R.users[userId].targetAcceptionRatio

		sumDeviation / Object.keys(R.users).length

	getAverageRatioTl: ->

		sumRatio = 0
		teamleaders = []

		for userId in Object.keys(R.users) when R.users[userId].teamleader || R.users[userId].substituteTeamleader
			teamleaders.push R.users[userId]
			sumRatio += R.users[userId].targetAcceptionRatio

		sumRatio / Object.keys(teamleaders).length

	getAverageRatioAll: ->

		sumRatio = 0

		for userId in Object.keys R.users
			sumRatio += R.users[userId].targetAcceptionRatio

		sumRatio / Object.keys(R.users).length

	getMaxReachedDay: (user, team) ->

		maxReachedDay = false
		confirmationsThisDay = []
		cTeams = R.users[user._id].confirmations.concat(R.users[user._id].tlConfirmations).map (cTeam) ->
			shiftId: cTeam.shiftId
			teamId: cTeam.teamId
			date: R.teams.filter((fTeam) -> fTeam.shiftId == cTeam.shiftId && fTeam._id == cTeam.teamId)[0].date

		# Alle angenommenen Bewerbungen dieses Tages zusammenfassen
		for cTeam in cTeams
			if team.date == cTeam.date
				# Schicht in confirmationsThisDay aufnehmen, wenn noch nicht gemacht
				if (confirmationsThisDay.filter (confirmation) -> confirmation.shiftId == cTeam.shiftId).length == 0
					confirmationsThisDay.push cTeam

		# Anzahl der angenommenen Bewerbungen (und ggf. auf Doppelschicht) prüfen
		if confirmationsThisDay.length == 1
			if R.users[user._id].maxDay == 1
				if !R.users[user._id].doubleShiftAllowed
					maxReachedDay = true
				else if R.shifts[confirmationsThisDay[0].shiftId].start != team.end && R.shifts[confirmationsThisDay[0].shiftId].end != team.start
					maxReachedDay = true
		else if confirmationsThisDay.length > 1 && confirmationsThisDay.length >= user.maxDay
			maxReachedDay = true

		maxReachedDay

	getMaxReachedPeriod: (user) -> R.users[user._id].acceptions >= R.users[user._id].maxPeriod
