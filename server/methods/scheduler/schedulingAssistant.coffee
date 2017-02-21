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

		Assistant.setAndOptimizeAll()
		Helpers.log()

		Assistant.optimizeByTeamReset()

		console.log R.count

		Assistant.saveToDB()

		console.log '----------- fertig -----------'
