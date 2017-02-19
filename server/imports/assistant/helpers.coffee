import { R } from './variables.coffee'

export Helpers =

	logExplanation: ->
		console.log 'averageDeviationRatio [abandonedTeamsTl] (abandonedTeamsUsers)'

	log: ->
		averageDeviationRatio = '' + (Math.round 1000 * @getAverageDeviationRatioAll()) / 10
		abandonedTeamsTl = ' [' + Helpers.countAbandonedTeamsTl() + ']'
		abandonedTeamsUsers = ' (' + Helpers.countAbandonedTeamsUsers() + ')'

		if averageDeviationRatio.length < 3
			averageDeviationRatio += '.0'

		console.log averageDeviationRatio + abandonedTeamsTl + abandonedTeamsUsers

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
				maxReachedDay = @getMaxReachedDay user, team
				maxReachedPeriod = @getMaxReachedPeriod user

				if maxReachedDay
					console.log u.name + ' bereits am Tages Maximum at ' + team.shiftId
				else if maxReachedPeriod
					console.log u.name + ' bereits am Maximum at ' + team.shiftId
					return

			team['participants'].push user

			team.pending = team.pending.filter (u) -> u._id != userId

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

			team.participants = team.participants.filter (u) -> u._id != userId

		# Acceptions senken
		R.users[userId].acceptions -= 1

		# Schicht aus teamleader confirmations Array entfernen
		R.users[userId].tlConfirmations = R.users[userId].tlConfirmations.filter (c) -> !(c.shiftId == shiftId && c.teamId == teamId)

		# Schicht aus confirmations Array entfernen
		R.users[userId].confirmations = R.users[userId].confirmations.filter (c) -> !(c.shiftId == shiftId && c.teamId = teamId)

		# Ratio errechnen
		R.users[userId].targetAcceptionRatio = R.users[userId].acceptions / R.users[userId].targetPeriod

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

				# Alle Teams durchgehen, wo er schon als Teilnehmer angenommen ist
				for team in R.users[foundUser._id].confirmations
					alreadyInAsTeamleader = R.users[foundUser._id].tlConfirmations.filter((tlTeam) -> team.teamId == tlTeam.teamId && team.shiftId == tlTeam.shiftId).length > 0
					if !alreadyInAsTeamleader
						team = (R.teams.filter (t) -> t._id == team.teamId && t.shiftId == team.shiftId)[0]

						# User in foundUsers aufnehmen, wenn noch nicht geschehen
						for rUser in team.pending when !@getMaxReachedDay rUser, team
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

		# Den User, von dem wir ausgegangen sind, aus den Ergebnissen entfernen
		foundUsers.splice 0, 1
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

					# User in foundUsers aufnehmen, wenn noch nicht geschehen
					for rUser in team.pending when (rUser.teamleader || rUser.substituteTeamleader) && !@getMaxReachedDay rUser, team
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

		# Den User, von dem wir ausgegangen sind, aus den Ergebnissen entfernen
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
		sumDeviation = 0.0
		averageRatio = @getAverageRatioTl()

		for userId in Object.keys(R.users) when R.users[userId].teamleader || R.users[userId].substituteTeamleader
			sumDeviation += Math.abs R.users[userId].targetAcceptionRatio - averageRatio

			teamleaders.push R.users[userId]

		sumDeviation / Object.keys(teamleaders).length

	getAverageDeviationRatioAll: ->

		sumDeviation = 0.0
		averageRatio = @getAverageRatioAll()

		for userId in Object.keys R.users
			sumDeviation += Math.abs R.users[userId].targetAcceptionRatio - averageRatio

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
		for cTeam in cTeams when team.date == cTeam.date
			# Schicht in confirmationsThisDay aufnehmen, wenn noch nicht gemacht
			if (confirmationsThisDay.filter (confirmation) -> confirmation.shiftId == cTeam.shiftId).length == 0
				confirmationsThisDay.push cTeam

		# Anzahl der angenommenen Bewerbungen (und ggf. auf Doppelschicht) prüfen
		if confirmationsThisDay.length == 1
			if R.users[user._id].maxDay == 1
				if !R.users[user._id].doubleShiftAllowed
					maxReachedDay = true
				else
					thisShift = R.shifts.filter((shift) -> shift._id == confirmationsThisDay[0].shiftId)[0]

					if thisShift.start != team.end && thisShift.end != team.start
						maxReachedDay = true
		else if confirmationsThisDay.length > 1 && confirmationsThisDay.length >= user.maxDay
			maxReachedDay = true

		maxReachedDay

	getMaxReachedPeriod: (user) -> R.users[user._id].acceptions >= R.users[user._id].maxPeriod
