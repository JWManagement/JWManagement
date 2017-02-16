import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'
import { wrs } from '/imports/util/delay.coffee'

import '/imports/api/resources/bootstrap-datepicker.js'
import '/imports/ui/components/profileDetails/profileDetails.coffee'
import '/imports/ui/components/profileSettings/profileSettings.coffee'
import '/imports/ui/components/profileAvailability/profileAvailability.coffee'

import './profile.tpl.jade'
import './profile.scss'

Template.profile.helpers

	picture: -> Pictures.findOne userId: Meteor.userId()

	getVacations: ->
		if @profile.vacations?
			@profile.vacations
				.filter (v) -> v.end >= parseInt(moment().format('YYYYDDDD'))
				.sort (a, b) -> a.start - b.start

Template.profile.onRendered ->

	$('.input-daterange').datepicker
		format: 'dd.mm.yyyy'
		language: FlowRouter.getParam('language')
		ignoreReadonly: true

Template.profile.onDestroyed ->

	Session.set 'target', undefined

Template.profile.events

	'click .profile-image': (e) -> wrs -> FlowRouter.setQueryParams editProfilePicture: true

		, Dialogs.handleSuccess

	'click .delVacation': (e) -> Meteor.call 'removeVacation', @_id

	'click #addVacation': ->
		today = moment().format('YYYYDDDD')
		Meteor.call 'addVacation', today, (err, vacationId) -> Tracker.afterFlush ->
			$('#' + vacationId).datepicker
				format: 'dd.mm.yyyy'
				language: FlowRouter.getParam('language')

	'change .startDate': (e) -> Meteor.call 'setVacationStart', @_id, e.target.value

	'change .endDate': (e) ->
		if moment(e.target.value, 'DD.MM.YYYY') < moment(0, 'HH')
			swal TAPi18n.__('swal.vacationEndInPast'), '', 'error'
		else
			Meteor.call 'setVacationEnd', @_id, e.target.value
