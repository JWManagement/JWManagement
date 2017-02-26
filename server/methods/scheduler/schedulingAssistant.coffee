import { Assistant } from '../../imports/assistant/assistant.coffee'
import { Helpers } from '../../imports/assistant/helpers.coffee'
import { R } from '../../imports/assistant/variables.coffee'

Meteor.methods

	schedule: (projectId, date, tagId) ->
		try
			i = 0
			while i < 1
				Assistant.resetAll projectId, date

				R.init()

				Assistant.fillShiftsArray projectId, date, tagId
				Assistant.fillUsersArray()
				Assistant.fillTeamsArray()

				#Helpers.logExplanation()

				Assistant.setAndOptimizeAll()
				Helpers.log()

				Assistant.optimizeByTeamReset()
				Helpers.log()

				#throw new Meteor.Error 500, ''
				#throw new Meteor.Error 'asdf'

				Assistant.saveToDB()

				console.log '---fertig ---  searchChangeables: ' + R.count

				i++

		catch e
			console.log e.error
			console.log 'Abgebrochen!'
