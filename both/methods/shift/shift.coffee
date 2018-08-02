moment = require('moment')

Meteor.methods

	addShift: (projectId, tagId, tagName, date, start) -> if Meteor.isServer
		shiftId = Random.id 12
		weekId = moment(date, 'YYYYDDDD').format('GGGG[W]WW')
		project = Projects.findOne projectId, fields: teams: 1
		newDay = {}
		newShifts = []
		tmpShifts = []

		check { userId: Meteor.userId(), projectId: projectId }, isShiftAdmin

		if project.teams.length > 0
			team = project.teams[0]
			week = Weeks.findOne projectId: projectId, date: weekId,
				fields: days: 1

			if week?
				for day in week.days when day.date == date
					newDay = day
					break

				shifts = Shifts.find _id: $in: newDay.shifts,
					fields: start: 1

				tmpShifts.push shift for shift in shifts.fetch()
				tmpShifts.push _id: shiftId, start: start
				tmpShifts.sort (a, b) ->
					if a.start != b.start
						a.start - b.start
					else if a.tagId < b.tagId
						-1
					else
						1
				newShifts.push shift._id for shift in tmpShifts

				newDay.shifts = newShifts

				Weeks.update _id: week._id, 'days.date': date,
					$set: 'days.$': newDay

				Shifts.insert
					_id: shiftId
					projectId: projectId
					weekId: week._id
					date: date
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
			throw new Meteor.Error 404, 'Project ' + projectId + ' has no teams'

	updateShift: (shiftId, field, value) ->
		shift = Shifts.findOne shiftId
		set = {}
		set[field] = value

		if Meteor.isServer
			check shiftId, isExistingShift
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftScheduler

			Shifts.update shiftId, $set: set

			if field == 'start'
				week = Weeks.findOne shift.weekId, fields: days: 1
				find = _id: week._id

				for day in week.days when shift._id in day.shifts
					newDay = day
					newDay.shifts.sort (s1, s2) ->
						s1 = Shifts.findOne s1, fields: start: 1
						s2 = Shifts.findOne s2, fields: start: 1
						s1.start - s2.start

				if newDay.date?
					find['days.date'] = newDay.date
				else
					find['days.day'] = newDay.day

				Weeks.update find, $set: 'days.$': newDay

	removeShift: (shiftId) ->
		if Meteor.isServer
			check shiftId, isExistingShift

		shift = Shifts.findOne shiftId
		week = undefined
		date = shift.date

		if Meteor.isServer
			check shiftId, isExistingShift
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftAdmin

		if date?
			weekId = moment(date, 'YYYYDDDD').format('GGGG[W]WW')

			week = Weeks.findOne projectId: shift.projectId, date: weekId,
				fields: days: 1
		else
			week = Weeks.findOne shift.weekId, fields: days: 1

		if week?
			newDay = {}
			find = _id: week._id

			for day in week.days when shiftId in day.shifts
				newDay = day
				break

			newDay.shifts.splice(newDay.shifts.indexOf(shiftId), 1)

			if date?
				find['days.date'] = date
			else
				find['days.day'] = newDay.day

			Weeks.update find, $set: 'days.$': newDay

			Shifts.remove shiftId
		else
			throw new Meteor.Error 500, 'Week of shift ' + shiftId + ' not found'
