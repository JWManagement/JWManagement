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
		Assistant.optimizeTeamleaders()
		Assistant.setTeamleaders()
		Assistant.optimizeMaxReachedTeamleaders()
		Assistant.optimizeTeamleaders()

		Assistant.setMinParticipants()
		Assistant.optimizeParticipants()
		Assistant.setMinParticipants()
		Assistant.optimizeMaxReachedParticipants()

		Assistant.saveToDB()
