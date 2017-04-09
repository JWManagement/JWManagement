import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import './shiftsHeader.tpl.jade'
import './shiftsHeader.scss'

R = {}

Template.shiftsHeader.helpers

Template.shiftsHeader.onCreated ->

	@autorun -> Meteor.subscribe 'futureWeeks', FR.getProjectId(), FR.getShowWeek()

Template.shiftsHeader.onRendered ->

		weeks = Weeks.find
			projectId: FR.getProjectId()
			start: $gte: parseInt moment().isoWeekday(1).format 'YYYYDDDD'
		,
			fields: date: 1
			sort: start: 1

		weeks = weeks.fetch().map (w) -> w.date


		$weekPicker = $('#datepicker-week')
		$weekPicker.datepicker
			minViewMode: 0
			maxViewMode: 0
			weekStart: 1
			todayBtn: 'linked'
			language: TAPi18n.getLanguage()
		.on 'changeDate', (e) ->
			newWeek = moment(e.date).format('YYYY[W]WW')
			if R.currentWeek != newWeek
				R.currentWeek = newWeek
				wrs -> FlowRouter.setQueryParams showWeek: newWeek
			if !$weekPicker.data('updating')
				$weekPicker.data('updating', true)
				weekDates = [0..6].map (number) -> moment(e.date).startOf('isoWeek').add(number, 'days').toDate()
				$(this).datepicker('clearDate').datepicker('setDates', weekDates)
				$weekPicker.data('updating', false)
		.find('.table-condensed').removeClass('table-condensed').addClass('table')

		Tracker.autorun ->
			FlowRouter.watchPathChange()

			if FR.getShowWeek() != R.currentWeek
				R.currentWeek = FR.getShowWeek()
				$weekPicker.datepicker 'setDate', new Date(moment(R.currentWeek).format())

Template.shiftsHeader.events

	'click .week-chooser': (e) ->
		$weekChooser = $('.week-chooser')
		$weekChooser.closest('div').toggleClass('showWeekPicker')
		$weekChooser.find('i.fa').toggleClass('fa-angle-down').toggleClass('fa-angle-up')

	'click #prevWeek': -> FlowRouter.setQueryParams showWeek: moment(FR.getShowWeek()).subtract(1, 'w').format('YYYY[W]WW')

	'click #nextWeek': -> FlowRouter.setQueryParams showWeek: moment(FR.getShowWeek()).add(1, 'w').format('YYYY[W]WW')
