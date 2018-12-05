Template.copyShiftModal.helpers

	getWeekDayTranslation: (path) ->
		i18next.t('weekdays.' + path)

	getProjectId: -> FlowRouter.getParam('projectId')

	weekdays: -> [ 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su' ]

Template.copyShiftModal.onRendered ->

	$('#beamerSelector').addClass('hidden')

	$('#copyShiftModal').modal('show')
	$('#copyShiftModal').on 'hidden.bs.modal', ->
		shiftId = FlowRouter.getQueryParam('copyShift')

		wrs -> FlowRouter.setQueryParams copyShift: undefined, editShift: shiftId

Template.copyShiftModal.events

	'click #copyShift': ->
		days = []

		$('#daySelects').find('.day').each (e, a) ->
			if $(a).find('input').is(':checked')
				days.push e + 1

		if days.length > 0
			projectId = FlowRouter.getParam('projectId')
			shiftId = FlowRouter.getQueryParam('copyShift')
			weekId = FlowRouter.getQueryParam('weekId')

			shift = Shifts.findOne shiftId

			tagId = shift.tagId
			tagName = shift.tag

			for day in days
				Meteor.call 'addTemplateShift', projectId, weekId, tagId, tagName, day, (e, shiftId) ->
					if e
						handleError e
					else
						Meteor.call 'updateShift', shiftId, 'start', shift.start
						Meteor.call 'updateShift', shiftId, 'end', shift.end
						Meteor.call 'updateShift', shiftId, 'status', shift.status
						Meteor.call 'updateShift', shiftId, 'scheduling', shift.scheduling
						Meteor.call 'updateShift', shiftId, 'teams', shift.teams
