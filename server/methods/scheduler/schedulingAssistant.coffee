import { Assistant } from '../../imports/assistant/assistant.coffee'
import { Helpers } from '../../imports/assistant/helpers.coffee'
import { R } from '../../imports/assistant/variables.coffee'

Meteor.methods

	schedule: (projectId, date, tagId) ->
		R.init()

		Assistant.fillShiftsArray projectId, date, tagId
		Assistant.fillUsersArray()
		Assistant.fillTeamsArray()

		Helpers.logExplanation()

		console.log '> setTeamleaders'
		Assistant.setTeamleaders()
		Helpers.log()

		console.log '> optimizeTeamleaders'
		Assistant.optimizeTeamleaders()
		Helpers.log()

		##

		console.log '>> setTeamleaders'
		Assistant.setTeamleaders()
		Helpers.log()

		console.log '>> optimizeMaxReachedTeamleaders'
		Assistant.optimizeMaxReachedTeamleaders()
		Helpers.log()

		console.log '>> optimizeTeamleaders'
		Assistant.optimizeTeamleaders()
		Helpers.log()

		##

		console.log '>>> setMinParticipants'
		Assistant.setMinParticipants()
		Helpers.log()

		console.log '>>> optimizeParticipants'
		Assistant.optimizeParticipants()
		Helpers.log()

		console.log '>>>> setMinParticipants'
		Assistant.setMinParticipants()
		Helpers.log()

		console.log '>>>> optimizeMaxReachedParticipants'
		Assistant.optimizeMaxReachedParticipants()
		Helpers.log()

		console.log '>>>> optimizeParticipants'
		Assistant.optimizeParticipants()
		Helpers.log()

		##

		console.log '>>>> setMinParticipants'
		Assistant.setMinParticipants()
		Helpers.log()

		console.log '>>>> optimizeMaxReachedParticipants'
		Assistant.optimizeMaxReachedParticipants()
		Helpers.log()

		##

		console.log '>>>>> optimizeTeamleaders'
		Assistant.optimizeTeamleaders()
		Helpers.log()

		console.log '>>>>> optimizeParticipants'
		Assistant.optimizeParticipants()
		Helpers.log()

		Assistant.saveToDB()

		console.log '----------- fertig -----------'
