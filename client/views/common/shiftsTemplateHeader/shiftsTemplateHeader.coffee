moment = require('moment')

Template.shiftsTemplateHeader.helpers

	initDatepickerStart: ->
		self = this
		startDate = moment(@startWeek).toDate()

		Tracker.afterFlush ->
			$('#datepickerStart').datepicker
				maxViewMode: 0
				weekStart: 1
				language: TAPi18n.getLanguage()
			.datepicker('setDates', [0..6].map (number) -> moment(startDate).startOf('isoWeek').add(number, 'days').toDate())
			.on 'changeDate', (e) ->
				projectId = FlowRouter.getParam('projectId')
				tagId = FlowRouter.getQueryParam('tagId')
				templateId = FlowRouter.getQueryParam('templateId')
				newDate = moment(e.date).format('GGGG[W]WW')

				if newDate != self.startWeek
					Meteor.call 'updateTemplate', projectId, tagId, templateId, 'startWeek', newDate
					self.startWeek = newDate

					weekDates = [0..6].map (number) ->
						moment(e.date).startOf('isoWeek').add(number, 'days').toDate()

					$(this).datepicker('clearDate').datepicker('setDates', weekDates)

			$('#datepickerStart').on 'click', (e) -> e.stopPropagation()
			$('#datepickerStart .day').on 'click', (e) ->
				$(e.target).closest('.dropdown').removeClass('open')
		''

	initDatepickerEnd: ->
		self = this
		endDate = moment(@endWeek).toDate()

		Tracker.afterFlush ->
			$('#datepickerEnd').datepicker
				maxViewMode: 0
				weekStart: 1
				language: TAPi18n.getLanguage()
			.datepicker('setDate', [0..6].map (number) -> moment(endDate).startOf('isoWeek').add(number, 'days').toDate())
			.on 'changeDate', (e) ->
				projectId = FlowRouter.getParam('projectId')
				tagId = FlowRouter.getQueryParam('tagId')
				templateId = FlowRouter.getQueryParam('templateId')
				newDate = moment(e.date).format('GGGG[W]WW')

				if newDate != self.endWeek
					Meteor.call 'updateTemplate', projectId, tagId, templateId, 'endWeek', newDate

				if newDate != self.endWeek
					Meteor.call 'updateTemplate', projectId, tagId, templateId, 'endWeek', newDate
					self.endWeek = newDate

					weekDates = [0..6].map (number) ->
						moment(e.date).startOf('isoWeek').add(number, 'days').toDate()

					$(this).datepicker('clearDate').datepicker('setDates', weekDates)

			$('#datepickerEnd').on 'click', (e) -> e.stopPropagation()
			$('#datepickerEnd .day').on 'click', (e) ->
				$(e.target).closest('.dropdown').removeClass('open')
		''

	notManual: -> @interval != 'm'

	getPossibleWeeks: -> [1..15]

	getInterval: ->
		if @interval?
			intervals =
				m: TAPi18n.__('intervals.m')
				every: TAPi18n.__('intervals.every')
				even: TAPi18n.__('intervals.even')
				odd: TAPi18n.__('intervals.odd')

			intervals[@interval]

	getIntervals: -> [
		{ _id: 'm', description: TAPi18n.__('intervals.m') }
		{ _id: 'every', description: TAPi18n.__('intervals.every') }
		{ _id: 'even', description: TAPi18n.__('intervals.even') }
		{ _id: 'odd', description: TAPi18n.__('intervals.odd') }
	]

	getTemplate: ->
		projectId = FlowRouter.getParam('projectId')
		tagId = FlowRouter.getQueryParam('tagId')
		templateId = FlowRouter.getQueryParam('templateId')
		project = Projects.findOne projectId, fields: tags: 1

		if project? && project.tags?
			for tag in project.tags when tag._id == tagId
				for template in tag.templates when template._id == templateId
					return template

Template.shiftsTemplateHeader.events

	'click .changeVisiblePeriod': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = FlowRouter.getQueryParam('tagId')
		templateId = FlowRouter.getQueryParam('templateId')
		visiblePeriod = parseInt($(e.target).attr('period'))

		Meteor.call 'updateTemplate', projectId, tagId, templateId, 'visiblePeriod', visiblePeriod
