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

		if !week
			wrs -> FlowRouter.setQueryParams showWeek: moment().format('GGGG[W]WW')

		Meteor.subscribe 'week', projectId, week

Template.shifts.onDestroyed ->

	Session.set 'target', undefined
	wrs -> FlowRouter.setQueryParams showWeek: null, showTags: null, weekId: null, view: null
