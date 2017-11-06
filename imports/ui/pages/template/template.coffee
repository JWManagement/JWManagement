import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import '/imports/ui/components/modals/modal.coffee'

import './template.tpl.jade'
import './template.scss'

Template.shifts.helpers

	getWeek: ->
		weekId = FR.getWeekId()

		if weekId?
			Weeks.findOne FR.getWeekId()

	weekDays: -> [1..7].map (i) -> moment().isoWeekday(i).format('ddd')

Template.shifts.onCreated ->

	# Check all this stuff vvv

	@autorun ->
		projectId = FR.getProjectId()
		weekId = FR.getWeekId()

		if weekId?
			Meteor.subscribe 'weekById', weekId
			Meteor.subscribe 'tags', projectId, tags: 1
		else
			week = FR.getShowWeek()

			if !week? || week == ''
				week = moment().format('GGGG[W]WW')
				wrs -> FlowRouter.setQueryParams showWeek: week

			handle = Meteor.subscribe 'tags', projectId, tags: 1
			handle.ready Tracker.afterFlush ->
				showTags = FR.getShowTags()

				if !showTags? || showTags == ''
					project = Projects.findOne projectId, fields: tags: 1
					visibleTags = []

					if project?.tags
						for tag in project.tags when Roles.userIsInRole Meteor.userId(), Permissions.participant, tag._id
							visibleTags.push tag._id

						wrs -> FlowRouter.setQueryParams showTags: visibleTags

			Meteor.subscribe 'week', projectId, week

Template.shifts.onDestroyed ->

	Session.set 'target', undefined
	wrs -> FlowRouter.setQueryParams showWeek: null, showTags: null, weekId: null, view: null

Template.shifts.events

	'click .changeInterval': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = FlowRouter.getQueryParam('tagId')
		templateId = FlowRouter.getQueryParam('templateId')
		intervalId = $(e.target).attr('intervalId')

		Meteor.call 'updateTemplate', projectId, tagId, templateId, 'interval', intervalId
