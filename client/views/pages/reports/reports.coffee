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

	'click #exportReports': ->
		button = $('#exportReports').ladda()
		button.ladda('start')

		shifts = Shifts.find()

		csvContent = 'data:text/csv;charset=utf-8,' + '\uFEFF'
		head = []
		head.push TAPi18n.__('modal.shiftReport.date'), TAPi18n.__('shifts.start'), TAPi18n.__('shifts.end'), TAPi18n.__('modal.editShift.team'), TAPi18n.__('modal.shiftReport.teamleader'), TAPi18n.__('reports.participants'), TAPi18n.__('modal.shiftReport.texts'), TAPi18n.__('modal.shiftReport.speaks'), TAPi18n.__('modal.shiftReport.videos'), TAPi18n.__('modal.shiftReport.returnVisits'), TAPi18n.__('modal.shiftReport.bibleStudies'), TAPi18n.__('modal.shiftReport.time'), TAPi18n.__('modal.shiftReport.trolleysFilled'), TAPi18n.__('modal.shiftReport.neatnessLast'), TAPi18n.__('modal.shiftReport.experiences') + ' ' + TAPi18n.__('modal.shiftReport.expRoute'), TAPi18n.__('modal.shiftReport.expGood'), TAPi18n.__('modal.shiftReport.expProblems'), TAPi18n.__('modal.shiftReport.publications')
		csvContent += head.join(';') + '\r\n'

		for shift in shifts.fetch()
			for team in shift.teams
				row = []
				row.push moment(shift.date, 'YYYYDDDD').format('YYYY-MM-DD')
				row.push moment(shift.start, 'HHmm').format('HH:mm')
				row.push moment(shift.end, 'HHmm').format('HH:mm')
				row.push team.name

				participants = ''
				for participant in team.participants
					if participant.thisTeamleader
						row.push participant.name
					else
						participants += participant.name
						if participant.state == ['sick', 'missing']
							participants += '(' + TAPi18n.__('modal.shiftReport.' + participant.state) + '),'
						else
							participants += ','
				row.push participants.replace(/,\s*$/, '') # remove last comma

				if team.report?
					row.push team.report.texts, team.report.speaks, team.report.videos, team.report.returnVisits, team.report.bibleStudies, team.report.hours, team.report.filled, team.report.neatness
					row.push team.report.experiences.route, team.report.experiences.good, team.report.experiences.problems

					for item in team.report.items
						row.push item.count + ' ' + item.short + '(' + item.language + ')'

				csvContent += row.join(';') + '\r\n'

		encodedUri = encodeURI(csvContent)
		link = document.createElement('a')
		link.setAttribute('href', encodedUri)
		link.setAttribute('download', 'reports.csv')
		document.body.appendChild(link)

		button.ladda('stop')
		link.click()
