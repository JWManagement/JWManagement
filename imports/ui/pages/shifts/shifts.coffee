import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import '/imports/ui/components/modals/modal.coffee'
import '/imports/ui/components/shiftsHeader/shiftsHeader.coffee'
import '/imports/ui/components/day/day.coffee'
import '/imports/ui/components/shift/shift.coffee'

import './shifts.tpl.jade'
import './shifts.scss'

Template.shifts.helpers

	getWeek: ->
		Weeks.findOne
			projectId: FR.getProjectId()
			date: FR.getShowWeek()

	today: -> 'today' if @date? == parseInt(moment().add(7, 'd').format('YYYYDDDD'))

	weekDays: -> [1..7].map (i) ->
		date: moment(FR.getShowWeek()).isoWeekday(i).format('ddd, DD.MM.')
		today: 'today' if parseInt(moment(FR.getShowWeek()).isoWeekday(i).format('YYYYDDDD')) == parseInt(moment().format('YYYYDDDD'))

	checkNoVisibleShifts: ->
		projectId = FR.getProjectId()
		showWeek = FR.getShowWeek()
		tags = FR.getShowTags()

		week = Weeks.findOne projectId: projectId, date: showWeek,
			fields: days: 1

		if week && week.days && tags
			for day in week.days
				for shiftId in day.shifts
					shift = Shifts.findOne shiftId, fields: tagId: 1

					if shift && shift.tagId in tags
						return false
		true

Template.shifts.onCreated ->

	@autorun ->
		projectId = FR.getProjectId()
		week = FR.getShowWeek()

		if week?
			Meteor.subscribe 'shifts.weeks', projectId, week
			Meteor.subscribe 'shifts.tags', projectId, ->
				tags = FR.getShowTags()
				project = Projects.findOne projectId, fields: tags: 1

				if !tags?
					wrs -> FlowRouter.setQueryParams showTags: project.tags.map((t) -> t._id)
				else
					beforeLength = tags.length
					tags = tags.filter (t) -> t in project.tags.map (tt) -> tt._id

					if tags.length != beforeLength
						wrs -> FlowRouter.setQueryParams showTags: tags
		else
			wrs -> FlowRouter.setQueryParams showWeek: moment().format('GGGG[W]WW')

Template.shifts.onDestroyed ->

	Session.set 'target', undefined
