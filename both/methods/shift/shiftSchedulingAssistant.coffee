@R = {}

Meteor.methods

	schedule: (projectId, date) -> if Meteor.isServer
		R.teams = []
		R.shifts = []
		R.users = {}
		R.setTeamleaders = {}
		R.possibleChangeables = {}

		Meteor.fillShiftsArray projectId, date
		Meteor.fillUsersArray()
		Meteor.fillTeamsArray()
		Meteor.setTeamleaders()

		Meteor.saveToDB()
