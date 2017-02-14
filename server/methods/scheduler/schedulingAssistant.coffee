import { Assistant } from '../../imports/assistant/assistant.coffee'
import { Helpers } from '../../imports/assistant/helpers.coffee'
import { R } from '../../imports/assistant/variables.coffee'

Meteor.methods

	schedule: (projectId, date, tagId) ->
		R.init()

		Assistant.fillShiftsArray projectId, date, tagId
		Assistant.fillUsersArray()
		Assistant.fillTeamsArray()

		console.log '> setTeamleaders'
		Assistant.setTeamleaders()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log '> optimizeTeamleaders'
		Assistant.optimizeTeamleaders()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsTl()
		console.log '>> setTeamleaders'
		Assistant.setTeamleaders()
		console.log Helpers.countAbandonedTeamsTl()
		console.log '>> optimizeMaxReachedTeamleaders'
		Assistant.optimizeMaxReachedTeamleaders()
		console.log Helpers.countAbandonedTeamsTl()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log '>> optimizeTeamleaders'
		Assistant.optimizeTeamleaders()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()

		console.log '>>> setMinParticipants'
		Assistant.setMinParticipants()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()
		console.log '>>> optimizeParticipants'
		Assistant.optimizeParticipants()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log '>>>> setMinParticipants'
		Assistant.setMinParticipants()
		console.log Helpers.countAbandonedTeamsUsers()
		console.log '>>>> optimizeMaxReachedParticipants'
		Assistant.optimizeMaxReachedParticipants()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log '>>>> optimizeParticipants'
		console.log Helpers.countAbandonedTeamsUsers()

		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log '>>>> setMinParticipants'
		Assistant.setMinParticipants()
		console.log Helpers.countAbandonedTeamsUsers()
		console.log '>>>> optimizeMaxReachedParticipants'
		Assistant.optimizeMaxReachedParticipants()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()

		console.log '>>>>> optimizeTeamleaders'
		Assistant.optimizeTeamleaders()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()
		console.log '>>>>> optimizeParticipants'
		Assistant.optimizeParticipants()
		console.log Math.round 100 * Helpers.getAverageDeviationRatioAll()
		console.log Helpers.countAbandonedTeamsUsers()

		Assistant.saveToDB()

		console.log '----- fertig -----'
