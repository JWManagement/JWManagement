Template.reports.helpers

	getProjectId: -> FlowRouter.getParam('projectId')

	getMonth: -> FlowRouter.getQueryParam('month')

Template.reports.onRendered ->

	$('.animated').removeClass('animated').addClass('skipping')

Template.reports.onCreated ->

	self = this
	projectId = FlowRouter.getParam('projectId')
	month = FlowRouter.getQueryParam('month')

	if !month?
		wrs -> FlowRouter.setQueryParams month: moment(new Date).format('YYYY[M]MM')
	else
		ShiftSubs.subscribe 'reports', projectId, month

Template.reports.events

	'click #prevMonth': ->
		prevMonth = moment(FlowRouter.getQueryParam('month'), 'YYYY-MM').subtract(1, 'M').format('YYYY[M]MM')
		wrs -> FlowRouter.setQueryParams month: prevMonth

	'click #nextMonth': ->
		nextMonth = moment(FlowRouter.getQueryParam('month'), 'YYYY-MM').add(1, 'M').format('YYYY[M]MM')
		wrs -> FlowRouter.setQueryParams month: nextMonth

	'click #showMissing': ->

	'click #showExperiences': (e) ->
		type = $(e.target).attr('type')
