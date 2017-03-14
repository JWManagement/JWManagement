import { Dialogs } from '/imports/util/dialogs.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import './profileHoliday.tpl.jade'

Template.profileHoliday.helpers

	getVacations: -> if @profile.vacations?
		@profile.vacations
			.filter (v) -> v.end >= parseInt(moment().format('YYYYDDDD'))
			.sort (a, b) -> a.start - b.start

Template.profileHoliday.events

	'click #addVacation': ->
		Meteor.users.methods.vacation.add.call {}, (err, vacationId) -> Tracker.afterFlush ->
			$('#' + vacationId).datepicker
				format: 'dd.mm.yyyy'
				language: FR.getLanguage()

	'click .removeVacation': (e) ->
		Meteor.users.methods.vacation.remove.call vacationId: @_id

	'change .startDate': (e) ->
		Meteor.users.methods.vacation.update.call
			vacationId: @_id
			field: 'start'
			value: e.target.value

	'change .endDate': (e) ->
		if moment(e.target.value, 'DD.MM.YYYY') < moment(0, 'HH')
			swal TAPi18n.__('swal.vacationEndInPast'), '', 'error'
		else
			Meteor.users.methods.vacation.update.call
				vacationId: @_id
				field: 'end'
				value: e.target.value
