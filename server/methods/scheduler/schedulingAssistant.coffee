import { Assistant } from '../../imports/assistant/assistant.coffee'
import { Helpers } from '../../imports/assistant/helpers.coffee'
import { R } from '../../imports/assistant/variables.coffee'

Meteor.methods

	schedule: (projectId, date, tagId) ->
		R.init()
		Assistant.fillShiftsArray projectId, date, tagId
		Assistant.fillUsersArray()
		Assistant.fillTeamsArray()
			i = 0
			while i < 1

		#Helpers.logExplanation()

		Assistant.setAndOptimizeAll()
		Helpers.log()

		Assistant.optimizeByTeamReset()
		Helpers.log()

		Assistant.saveToDB()

		console.log '---fertig ---  searchChangeables: ' + R.count
				i++
