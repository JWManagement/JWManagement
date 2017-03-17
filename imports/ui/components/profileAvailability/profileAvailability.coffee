import { Dialogs } from '/imports/util/dialogs.coffee'

import './profileAvailability.tpl.jade'

Template.profileAvailability.helpers

	isAvailable: (day, hour) ->
		if @profile.available? && Object.keys(@profile.available).length > 0
			if parseInt(hour) * 100 in @profile.available[day]
				'available'

	weekdays: -> [ 'mo', 'tu', 'we', 'th', 'fr', 'sa', 'su' ]

	hours: -> [0..23]

	negate: (value) -> !value

Template.profileAvailability.events

	'click .timetable tbody td:not(.day)': (e) ->
		Meteor.users.methods.availability.toggle.call
			day: $(e.target).parent().attr('data-day')
			hour: $(e.target).attr('data-hour') * 100
		, Dialogs.handleSuccess

	'change #shortTermCalls': (e) ->
		Meteor.users.methods.availability.update.call
			field: 'shortTermCalls'
			value: e.target.checked
		, Dialogs.handleSuccess

		if e.target.checked == false
			Meteor.users.methods.availability.update.call
				field: 'shortTermCallsAlways'
				value: false

	'change #shortTermCallsAlways': (e) ->
		Meteor.users.methods.availability.update.call
			field: 'shortTermCallsAlways'
			value: e.target.checked
		, Dialogs.handleSuccess

	'change #notifyViaPush': (e) ->
		Meteor.call 'updateProfile', 'notifyViaPush', e.target.checked, handleSuccess
		if e.target.checked == false
			Meteor.call 'updateProfile', 'notifyViaEmail', false

	'change #notifyViaPush': (e) -> Meteor.call 'updateProfile', 'notifyViaEmail', e.target.checked, handleSuccess
