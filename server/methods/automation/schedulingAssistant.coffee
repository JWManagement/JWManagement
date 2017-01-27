import { Scheduler } from './scheduler.coffee'

@R = {}

Meteor.methods

	schedule: (projectId, date, tagId) ->
		R.teams = []
		R.shifts = []
		R.allShifts = []
		R.users = {}
		R.setTeamleaders = []
		R.possibleChangeables = {}

		Scheduler.fillShiftsArray projectId, date, tagId
		Scheduler.fillUsersArray()
		Scheduler.fillTeamsArray()
		Scheduler.setTeamleaders()
		Scheduler.optimizeTeamleaders()

		Scheduler.saveToDB()
