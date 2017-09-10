import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Projects } from '/imports/api/projects/projects.coffee'
import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { Delay } from '/imports/api/util/delay.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import './day.tpl.jade'

Template.day.helpers

Template.day.events

	'click #addShift': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = FR.getShowTags().split('_')[0]
		date = $(e.target).closest('.day-wrapper').attr('date')
		day = $(e.target).closest('.day-wrapper').attr('day')
		start = $(e.target).closest('.add-shift').prev('.separator').prev('.shift').attr('end') || 1000
		project = Projects.findOne projectId, fields: tags: 1

		if project? && date?
			for tag in project.tags when tag._id == tagId
				Meteor.call 'addShift', projectId, tagId, tag.name, parseInt(date), parseInt(start), Dialogs.handleError

	'click #removeAll': (e) ->
		visibleTags = FR.getShowTags().split('_')
		shifts = @shifts.filter (s) -> Shifts.findOne(s).tagId in visibleTags

		swalYesNo
			swal: 'delete.allShifts'
			doConfirm: ->
				for shift in shifts
					Meteor.call 'removeShift', shift, Dialogs.handleError
