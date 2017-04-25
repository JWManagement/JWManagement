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
			if FlowRouter.getQueryParam('weekId')?
				a == 'editShifts'
			else
				a == FlowRouter.getQueryParam('view')
		else if FlowRouter.getQueryParam('weekId')?
			'editShifts'
		else
			FlowRouter.getQueryParam('view') || 'showNames'

	getWeek: ->
		if FlowRouter.getQueryParam('showWeek')?
			Weeks.findOne
				projectId: FlowRouter.getParam('projectId')
				date: FlowRouter.getQueryParam('showWeek')
		else if FlowRouter.getQueryParam('weekId')?
			Weeks.findOne FlowRouter.getQueryParam('weekId')

	weekDays: -> [1..7].map (i) -> moment(new Date).isoWeekday(i).format('ddd')

	checkNoVisibleShifts: ->
		weekId = FlowRouter.getQueryParam('weekId')

		unless weekId
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

		if FlowRouter.getQueryParam('weekId')?
			weekId = FlowRouter.getQueryParam('weekId')
			Meteor.subscribe 'weekById', weekId

			Meteor.subscribe 'tags', projectId, tags: 1
		else
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
