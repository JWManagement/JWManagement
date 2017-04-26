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

	view: (a) ->
		if a?
			a == FlowRouter.getQueryParam('view')
		else
			FlowRouter.getQueryParam('view') || 'showNames'

	getWeek: ->
		Weeks.findOne
			projectId: FlowRouter.getParam('projectId')
			date: FlowRouter.getQueryParam('showWeek')

	today: -> 'today' if @date? == parseInt(moment().add(7, 'd').format('YYYYDDDD'))

	weekDays: -> [1..7].map (i) ->
		date: moment(FR.getShowWeek()).isoWeekday(i).format('ddd, DD.MM.')
		today: 'today' if parseInt(moment(FR.getShowWeek()).isoWeekday(i).format('YYYYDDDD')) == parseInt(moment().format('YYYYDDDD'))

	checkNoVisibleShifts: ->
		projectId = FlowRouter.getParam('projectId')
		showWeek = FlowRouter.getQueryParam('showWeek')
		tags = FlowRouter.getQueryParam('showTags')

		week = Weeks.findOne projectId: projectId, date: showWeek,
			fields: days: 1

		if week && tags
			for day in week.days
				for shiftId in day.shifts
					shift = Shifts.findOne shiftId, fields: tagId: 1

					if shift && shift.tagId in tags.split('_')
						return false
		true

Template.shifts.onCreated ->

	#if !FR.getShowWeek()
	#	wrs -> FlowRouter.setQueryParams showWeek: moment().format('GGGG[W]WW')

	@autorun ->
		projectId = FlowRouter.getParam('projectId')
		week = FlowRouter.getQueryParam('showWeek')

		if !week? || week == ''
			week = moment().format('GGGG[W]WW')
			wrs -> FlowRouter.setQueryParams showWeek: week

		handle = Meteor.subscribe 'tags', projectId, tags: 1
		handle.ready Tracker.afterFlush ->
			showTags = FlowRouter.getQueryParam('showTags')

			if !showTags? || showTags == ''
				project = Projects.findOne projectId, fields: tags: 1
				visibleTags = []

				if project?.tags
					for tag in project.tags when Roles.userIsInRole Meteor.userId(), Permissions.participant, tag._id
						visibleTags.push tag._id

					wrs -> FlowRouter.setQueryParams showTags: visibleTags.join('_')

		Meteor.subscribe 'week', projectId, week

Template.shifts.onDestroyed ->

	Session.set 'target', undefined
	wrs -> FlowRouter.setQueryParams showWeek: null, showTags: null, weekId: null, view: null
