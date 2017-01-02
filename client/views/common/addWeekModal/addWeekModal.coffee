Template.addWeekModal.helpers

	getProject: -> Projects.findOne FlowRouter.getParam('projectId'), fields: tags: 1

Template.addWeekModal.onCreated ->

	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		handle = ProjectSubs.subscribe 'tags', projectId
		handle.ready Tracker.afterFlush ->
			$('#addWeekModal').modal('show')
			$('#addWeekModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams addWeek: undefined

			$weekPicker = $('#datepicker-week')

			$weekPicker.datepicker
				calendarWeeks: true
				maxViewMode: 0
				weekStart: 1
				language: TAPi18n.getLanguage()
			.on 'changeDate', (e) ->
				if !$weekPicker.data('updating')
					$weekPicker.data('updating', true)

					weekDates = [0..6].map (number) ->
						moment(e.date).startOf('isoWeek').add(number, 'days').toDate()

					$(this).datepicker('clearDate').datepicker('setDates', weekDates)

					$weekPicker.data('updating', false)
			.datepicker('setDate', new Date)

Template.addWeekModal.events

	'click .changeTemplate': (e) ->
		$(e.target).closest('.dropdown').attr('tagId', $(e.target).attr('tagId'))
		$(e.target).closest('.dropdown').attr('templateId', $(e.target).attr('templateId'))
		$(e.target).closest('.dropdown').find('button .m-r').html($(e.target).html())

	'click #addTemplateWeek': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = $(e.target).closest('.modal-body').find('.dropdown').attr('tagId')
		templateId = $(e.target).closest('.modal-body').find('.dropdown').attr('templateId')
		weekId = moment($('#datepicker-week').datepicker('getDate')).format('GGGG[W]WW')

		Meteor.call 'addTemplateWeek', projectId, tagId, templateId, weekId
		$('#addWeekModal').modal('hide')
