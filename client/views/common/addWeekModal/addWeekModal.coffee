Template.addWeekModal.helpers

	getProject: ->
		project = Projects.findOne FlowRouter.getParam('projectId'), fields: tags: 1

		if project && project.tags
			for tag in project.tags when tag.templates && tag.templates.length > 0
				return project

			_id: project._id, noTemplate: true

Template.addWeekModal.onCreated ->

	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		handle = ProjectSubs.subscribe 'tags', projectId
		handle.ready Tracker.afterFlush ->
			$('#addWeekModal').modal('show')
			$('#addWeekModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams addWeek: undefined

			weeks = Weeks.find
				projectId: FlowRouter.getParam('projectId')
				start: $gte: parseInt moment(new Date).isoWeekday(1).format 'YYYYDDDD'
			,
				fields: date: 1
				sort: start: 1

			weeks = weeks.fetch().map (w) -> w.date
			nextWeek = new Date moment(weeks[weeks.length - 1]).add(1, 'week').format()

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
			.datepicker('setDate', nextWeek)

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
