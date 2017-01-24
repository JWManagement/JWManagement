Meteor.moveUser = (shiftId, teamId, from, to, user) ->

	for team in R.teams when team.shiftId == shiftId && team._id == teamId
		team[to].push user

		for userItem, index in team[from] when userItem._id == user._id
			team[from][index..index] = []
			break

	if from == 'pending' && to == 'participants'
		R.users[user._id].acceptions += 1

		if user.thisTeamleader
			R.users[user._id].tlConfirmations.push shiftId: shiftId, teamId: teamId
		else
			R.users[user._id].confirmations.push shiftId: shiftId, teamId: teamId
	else if from == 'participants' && to == 'pending'
		R.users[user._id].acceptions -= 1

		for tlConfirmation, index in R.users[user._id].tlConfirmations
			if tlConfirmation.shiftId = shiftId && tlConfirmation.teamId = teamId
				R.users[user._id].tlConfirmations[index..index] = []

		for confirmation, index in R.users[user._id].confirmations
			if confirmation.shiftId = shiftId && confirmation.teamId = teamId
				R.users[user._id].confirmations[index..index] = []

	R.users[user._id].targetAcceptionRatio = R.users[user._id].acceptions / R.users[user._id].target

Meteor.fillShiftsArray = (projectId, date) ->

	shiftIds = []

	week = Weeks.findOne
		projectId: projectId
		date: date

	for day in week.days
		for shift in day.shifts
			shiftIds.push shift

	R.shifts = Shifts.find _id: $in: shiftIds
	R.shifts = R.shifts.fetch()

Meteor.fillUsersArray = ->

	for shift in R.shifts
		for team in shift.teams
			for user in team.pending
				if user._id in Object.keys R.users
					R.users[user._id].requests.push shiftId: shift._id, teamId: team._id
				else
					user.target = Random.choice [1, 2, 3] # TODO: CHANGE
					user.max = user.target + 1 # TODO: CHANGE
					user.acceptions = 0
					user.targetAcceptionRatio = user.acceptions / user.target
					user.requests = [{shiftId: shift._id, teamId: team._id}]
					user.confirmations = []
					user.tlConfirmations = []
					R.users[user._id] = user

Meteor.fillTeamsArray = ->

	for shift in R.shifts
		for team, index in shift.teams
			hasTeamleader = false

			for user in team.pending
				if user.teamleader || user.substituteTeamleader
					hasTeamleader = true

			if hasTeamleader
				team.shiftId = shift._id
				team.requestAmount = team.pending.length

				if team.requestAmount >= team.min # TODO: als wahrscheinlichkeit berücksichten
					R.teams.push team

	teams = R.teams.sort (a, b) -> b.requestAmount - a.requestAmount

Meteor.setTeamleaders = ->

	for team in R.teams
		thisTeamleader = {}

		for user in team.pending
			if user.teamleader && R.users[user._id].acceptions < R.users[user._id].max
				thisTeamleader = user
				break

		if !thisTeamleader
			for user in team.pending
				if user.substituteTeamleader && R.users[user._id].acceptions < R.users[user._id].max
					thisTeamleader = user
					break

		if thisTeamleader && Object.keys(thisTeamleader).length > 0
			Meteor.moveUser team.shiftId, team._id, 'pending', 'participants', thisTeamleader

		R.setTeamleaders[thisTeamleader._id] = thisTeamleader

Meteor.saveToDB = ->

	for team in R.teams
		Shifts.update _id: team.shiftId, 'teams._id': team._id,
			$set: 'teams.$': team
