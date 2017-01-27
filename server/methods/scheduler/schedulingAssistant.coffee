import { Assistant } from '../../imports/assistant/assistant.coffee'
import { R } from '../../imports/assistant/variables.coffee'

Meteor.methods

	schedule: (projectId, date, tagId) ->
		Assistant.fillShiftsArray projectId, date, tagId
		Assistant.fillUsersArray()
		Assistant.fillTeamsArray()
		Assistant.setTeamleaders()
		Assistant.optimizeTeamleaders()

		Assistant.saveToDB()
