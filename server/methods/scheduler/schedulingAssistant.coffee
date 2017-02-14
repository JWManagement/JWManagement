import { Assistant } from '../../imports/assistant/assistant.coffee'
import { Helpers } from '../../imports/assistant/helpers.coffee'
import { R } from '../../imports/assistant/variables.coffee'

Meteor.methods

	schedule: (projectId, date, tagId) ->
		R.init()

		Assistant.fillShiftsArray projectId, date, tagId
		Assistant.fillUsersArray()
		Assistant.fillTeamsArray()

		Assistant.setTeamleaders()
		console.log '> setTeamleaders'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		Assistant.optimizeTeamleaders()
		console.log '> optimizeTeamleaders'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsTl()
		Assistant.setTeamleaders()
		console.log '>> setTeamleaders'
		console.log Helpers.countAbandonedTeamsTl()
		Assistant.optimizeMaxReachedTeamleaders()
		console.log '>> optimizeMaxReachedTeamleaders'
		console.log Helpers.countAbandonedTeamsTl()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		Assistant.optimizeTeamleaders()
		console.log '>> optimizeTeamleaders'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()

		Assistant.setMinParticipants()
		console.log '>>> setMinParticipants'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()
		Assistant.optimizeParticipants()
		console.log '>>> optimizeParticipants'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		Assistant.setMinParticipants()
		console.log '>>>> setMinParticipants'
		console.log Helpers.countAbandonedTeamsUsers()
		Assistant.optimizeMaxReachedParticipants()
		console.log '>>>> optimizeMaxReachedTeamleaders'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()

		console.log '>>>> optimizeParticipants'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		Assistant.setMinParticipants()
		console.log '>>>> setMinParticipants'
		console.log Helpers.countAbandonedTeamsUsers()
		Assistant.optimizeMaxReachedParticipants()
		console.log '>>>> optimizeMaxReachedTeamleaders'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()

		Assistant.optimizeTeamleaders()
		console.log '>>>>> optimizeTeamleaders'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()
		Assistant.optimizeParticipants()
		console.log '>>>>> optimizeParticipants'
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()

		Assistant.saveToDB()

		console.log '----- fertig -----'
