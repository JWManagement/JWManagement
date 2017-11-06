import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import './shiftsHeader.tpl.jade'
import './shiftsHeader.scss'

R = {}

Template.shiftsHeader.helpers

	prevWeekButton: ->
		weeks = Weeks.find
			projectId: FR.getProjectId()
			date: moment(FR.getShowWeek()).subtract(1, 'w').format('YYYY[W]WW')

		if weeks.fetch().length == 0
			'btn-default disabled'
		else
			'btn-primary'

	nextWeekButton: ->
		weeks = Weeks.find
			projectId: FR.getProjectId()
			date: moment(FR.getShowWeek()).add(1, 'w').format('YYYY[W]WW')

		if weeks.fetch().length == 0
			'btn-default disabled'
		else
			'btn-primary'

Template.shiftsHeader.onRendered ->

	@autorun -> if Weeks.find({}, _id: 1).fetch().length > 0
		projectId = FR.getProjectId()

		v1 = parseInt moment().format('YYYYDDDD')
		v2 = parseInt moment(FR.getShowWeek()).format('YYYYDDDD')
		earliestWeek = (v1 + v2) / 2 - Math.abs(v1 - v2) / 2

		weeks = Weeks.find projectId: projectId,
			fields: date: 1
			sort: start: 1

		weeks = weeks
			.fetch()
			.map (w) -> w.date
			.filter (w) -> w?

		startDate = moment(weeks[0]).format('DD/MM/YYYY')
		endDate = moment(weeks[weeks.length - 1]).isoWeekday(7).format('DD/MM/YYYY')

		$weekPicker = $('.week-chooser')
		$weekPicker.datepicker
			weekStart: 1
			autoclose: true
			todayBtn: 'linked'
			language: TAPi18n.getLanguage()
			todayHighlight: true
			startDate: startDate
			endDate: endDate
			beforeShowDay: (date) ->
				weekDate = moment(date).format('YYYY[W]WW')
				week = Weeks.findOne
					projectId: projectId
					date: weekDate
				week?
		.on 'changeDate', (e, a) ->
			newWeek = moment(e.date).format('YYYY[W]WW')

			if R.currentWeek != newWeek
				R.currentWeek = newWeek
				wrs -> FlowRouter.setQueryParams showWeek: newWeek

			if !$weekPicker.data('updating')
				$weekPicker.data('updating', true)

				weekDates = [0..6].map (number) -> moment(e.date).startOf('isoWeek').add(number, 'days').toDate()
				$(this).datepicker('clearDate').datepicker('setDates', weekDates)

				$weekPicker.data('updating', false)

		FlowRouter.watchPathChange()

		console.log 'TODO: automatically chooses 2017W18'

		if FR.getShowWeek() != R.currentWeek
			R.currentWeek = FR.getShowWeek()
			$weekPicker.datepicker 'update', new Date(moment(R.currentWeek).format())

Template.shiftsHeader.events

	'click #prevWeek': ->
		FlowRouter.setQueryParams showWeek: moment(FR.getShowWeek()).subtract(1, 'w').format('YYYY[W]WW')
		$('#prevWeek').blur()

	'click #nextWeek': ->
		FlowRouter.setQueryParams showWeek: moment(FR.getShowWeek()).add(1, 'w').format('YYYY[W]WW')
		$('#nextWeek').blur()

	'click #printShifts': ->
		window.print();
