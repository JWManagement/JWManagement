Template.reports.helpers

	getProjectId: -> FlowRouter.getParam('projectId')

	getMonth: -> FlowRouter.getQueryParam('month')

	readyOrDisabled: -> unless ShiftSubs.ready() then 'disabled'

Template.reports.onRendered ->

	$('.animated').removeClass('animated').addClass('skipping')

Template.reports.onCreated ->

	self = this
	projectId = FlowRouter.getParam('projectId')
	month = FlowRouter.getQueryParam('month')

	if !month?
		wrs -> FlowRouter.setQueryParams month: moment(new Date).format('YYYY[M]MM')
		month = moment(new Date).format('YYYY[M]MM')

	Session.set 'subscribe', month
	@autorun ->
		if Session.get 'subscribe'
			ShiftSubs.subscribe 'reports', projectId, Session.get 'subscribe'
			Session.set 'subscribe', false

Template.reports.events

	'click #prevMonth': ->
		prevMonth = moment(FlowRouter.getQueryParam('month'), 'YYYY[M]MM').subtract(1, 'M').format('YYYY[M]MM')
		wrs -> FlowRouter.setQueryParams month: prevMonth
		Session.set 'subscribe', prevMonth

	'click #nextMonth': ->
		nextMonth = moment(FlowRouter.getQueryParam('month'), 'YYYY[M]MM').add(1, 'M').format('YYYY[M]MM')
		wrs -> FlowRouter.setQueryParams month: nextMonth
		Session.set 'subscribe', nextMonth

	'click #showMissing': -> false

	'click #showExperiences': (e) ->
		type = $(e.target).attr('type')

	'click #exportReports': ->
		projectId = FlowRouter.getParam('projectId')
		month = FlowRouter.getQueryParam('month')

		if month?
			csvContent = 'data:text/csv;charset=utf-8,' + '\uFEFF'
			head = []
			head.push TAPi18n.__('modal.shiftReport.date'), TAPi18n.__('shifts.start'), TAPi18n.__('shifts.end'), TAPi18n.__('modal.editShift.team'), TAPi18n.__('modal.shiftReport.teamleader'), TAPi18n.__('reports.participants'), TAPi18n.__('modal.shiftReport.texts'), TAPi18n.__('modal.shiftReport.speaks'), TAPi18n.__('modal.shiftReport.videos'), TAPi18n.__('modal.shiftReport.returnVisits'), TAPi18n.__('modal.shiftReport.bibleStudies'), TAPi18n.__('modal.shiftReport.time'), TAPi18n.__('modal.shiftReport.trolleysFilled'), TAPi18n.__('modal.shiftReport.neatnessLast'), TAPi18n.__('modal.shiftReport.experiences') + ' ' + TAPi18n.__('modal.shiftReport.expRoute'), TAPi18n.__('modal.shiftReport.expGood'), TAPi18n.__('modal.shiftReport.expProblems'), TAPi18n.__('modal.shiftReport.publications')
			csvContent += head.join(';') + '\r\n'

			firstDay = parseInt moment(month, 'YYYY[M]MM').format('YYYYDDDD')
			lastDay = parseInt moment(month, 'YYYY[M]MM').endOf('month').format('YYYYDDDD')

			shifts = Shifts.find
				projectId: projectId
				$and: [
					date: $gte: firstDay
				,
					date: $lte: lastDay
				]
			,
				sort: date: 1, start: 1, end: 1

			for shift in shifts.fetch()
				for team in shift.teams
					row = []
					row.push moment(shift.date, 'YYYYDDDD').format('YYYY-MM-DD')
					row.push moment(shift.start, 'Hmm').format('HH:mm')
					row.push moment(shift.end, 'Hmm').format('HH:mm')
					row.push team.name

					participants = ''
					for participant in team.participants
						if participant.thisTeamleader
							row.push participant.name.trim()
						else
							participants += participant.name.trim()
							if participant.state in ['sick', 'missing']
								participants += '(' + TAPi18n.__('modal.shiftReport.' + participant.state) + '),'
							else
								participants += ','
					row.push participants.replace(/,\s*$/, '') # remove last comma

					if team.report? && team.report.items?
						row.push team.report.texts, team.report.speaks, team.report.videos, team.report.returnVisits, team.report.bibleStudies, team.report.hours, team.report.filled, team.report.neatness

						route = team.report.experiences.route || ''
						good = team.report.experiences.good || ''
						problems = team.report.experiences.problems || ''

						row.push route.replace(/(?:\\[rn]|[\r\n]+)+/g, ' ')
						row.push good.replace(/(?:\\[rn]|[\r\n]+)+/g, ' ')
						row.push problems.replace(/(?:\\[rn]|[\r\n]+)+/g, ' ')

						for item in team.report.items
							row.push item.count + ' ' + item.short + '-' + item.language.short

					csvContent += row.join(';') + '\r\n'

			encodedUri = encodeURI(csvContent)
			link = document.createElement('a')
			link.setAttribute('href', encodedUri)
			link.setAttribute('target', 'blank')
			link.setAttribute('download', 'reports.csv')
			document.body.appendChild(link)
			link.click()
