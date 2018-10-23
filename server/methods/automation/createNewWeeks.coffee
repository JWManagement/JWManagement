moment = require('moment')

exports.createNewWeeks = ->

	for project in projects
		hadAutomation = false

		for tag in project.tags
			for template in tag.templates when template.interval != 'm'
				templateWeek = Weeks.findOne template.weekId
				currentWeek = parseInt(moment(new Date).format('GGGGWW'))
				startWeek = parseInt(moment(template.startWeek).format('GGGGWW'))
				endWeek = parseInt(moment(template.endWeek).format('GGGGWW'))

				if startWeek <= currentWeek && endWeek >= currentWeek && template.visiblePeriod <= 15
					for number in [0..template.visiblePeriod]
						iteratedDate = parseInt(moment(new Date).add(number, 'weeks').format('YYYYDDDD'))
						iteratedWeek = Weeks.findOne iteratedDate
						doThisWeek = false

						if template.interval == 'every'
							doThisWeek = true
						else if template.interval == 'even'
							doThisWeek = parseInt(moment(iteratedWeek.date).format('GGGGWW')) % 2 == 0
						else if template.interval == 'odd'
							doThisWeek = parseInt(moment(iteratedWeek.date).format('GGGGWW')) % 2 == 1

						if doThisWeek && !iteratedWeek? or !(template._id in iteratedWeek.appliedTemplates)
							Meteor.call 'addTemplateWeek', project._id, tag._id, template._id, iteratedWeek._id
							hadAutomation = true

		if hadAutomation
			updatedProjects.push project.name

	console.log 'Updated ' + updatedProjects.length + ' Projects: [' + updatedProjects.join(', ') + ']'
