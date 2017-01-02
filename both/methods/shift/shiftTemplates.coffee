Meteor.methods

	addTemplateShift: (projectId, weekId, tagId, tagName, day) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

			project = Projects.findOne projectId, fields: teams: 1

			if project.teams.length > 0
				shiftId = Random.id 12
				start = 1000
				day = parseInt(day)
				team = project.teams[0]
				week = Weeks.findOne weekId, fields: days: 1

				if week?
					newDay = {}
					newShifts = []
					tmpShifts = []

					for d in week.days when d.day == day
						newDay = d

					if newDay.shifts.length > 0
						prevShiftId = newDay.shifts[newDay.shifts.length - 1]
						prevShift = Shifts.findOne prevShiftId, fields: end: 1
						start = prevShift.end

					shifts = Shifts.find _id: $in: newDay.shifts, { fields: start: 1 }

					tmpShifts.push shift for shift in shifts.fetch()
					tmpShifts.push _id: shiftId, start: start
					tmpShifts.sort (a, b) -> a.start - b.start
					newShifts = tmpShifts.map (shift) -> shift._id

					newDay.shifts = newShifts

					Weeks.update
						_id: week._id
						'days.day': day
					,
						$set: 'days.$': newDay

					Shifts.insert
						_id: shiftId
						projectId: projectId
						weekId: weekId
						start: start
						end: start + 200
						tag: tagName
						tagId: tagId
						status: 'open'
						scheduling: 'direct'
						teams: [{
							_id: team._id
							name: team.name
							link: team.link
							description: team.description
							status: 'open'
							min: 2
							max: 3
							meetingStart: null
							meetingEnd: null
							participants: []
							pending: []
							declined: []
						}]

					shiftId
				else
					throw new Meteor.Error 404, 'Week ' + weekId + ' not found'
			else
				throw new Meteor.Error 500, 'Project ' + project + ' has no teams defined'

	addTemplateWeek: (projectId, tagId, templateId, weekId) ->
		if Meteor.isServer
			check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

			project = Projects.findOne projectId, fields: 'tags._id': 1, 'tags.templates': 1
			templateWeekId = ''

			for tag in project.tags when tag._id == tagId
				for def in tag.templates when def._id == templateId
					templateWeekId = def.weekId

			templateWeek = Weeks.findOne templateWeekId

			if templateWeek?
				week = Weeks.findOne projectId: projectId, date: weekId
				weekStart = moment(weekId, 'YYYY-WW').isoWeekday(1).format('YYYYDDDD')

				if !week?
					Weeks.insert
						_id: Random.id 11
						projectId: projectId
						appliedTemplates: []
						start: parseInt(weekStart)
						date: weekId
						days: [1..7].map (number) -> date: parseInt(moment(weekId).isoWeekday(number).format('YYYYDDDD')), shifts: []
					week = Weeks.findOne projectId: projectId, date: weekId

				for day, index in week.days
					oldShifts = day.shifts
					newShifts = []
					enlargedShifts = []
					concatShifts = []

					for shiftId in templateWeek.days[index].shifts
						shift = Shifts.findOne shiftId
						newShiftId = Random.id 12
						newShifts.push newShiftId

						Shifts.insert
							_id: newShiftId
							projectId: projectId
							weekId: week._id
							date: day.date
							start: shift.start
							end: shift.end
							tag: shift.tag
							tagId: shift.tagId
							status: shift.status
							scheduling: shift.scheduling
							teamleader: shift.teamleader
							teams: shift.teams

					for oldShift in oldShifts.concat(newShifts)
						shift = Shifts.findOne oldShift, fields: start: 1

						enlargedShifts.push
							_id: oldShift
							start: shift.start

					enlargedShifts.sort (a, b) -> a.start - b.start

					for shift in enlargedShifts
						concatShifts.push shift._id

					Weeks.update
						_id: week._id
						'days.date': day.date
					,
						$set: 'days.$.shifts': concatShifts
						$addToSet: appliedTemplates: templateId
			else
				throw new Meteor.Error 404, 'Template week ' + templateWeekId + ' not found'
