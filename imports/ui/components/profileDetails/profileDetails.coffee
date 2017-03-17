import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import './profileDetails.tpl.jade'

Template.profileDetails.helpers

	isField: (field, val) -> 'selected' if @profile? and @profile[field] == val

Template.profileDetails.onRendered ->

	$('#bdate-wrapper').datepicker
		format: 'dd.mm.yyyy'
		autoclose: true
		forceParse: false
		startDate: '1900/01/01'
		language: FR.getLanguage()

Template.profileDetails.events

	'change #firstname': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'firstname'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #lastname': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'lastname'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #username': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'username'
			value: e.target.value
		, (error) ->
			if error
				if error.error == 406
					swal TAPi18n.__('profile.usernameTaken'), '', 'error'
					Delay -> $(e.target).val Meteor.user().username
				else
					Dialogs.handleError error
			else
				Dialogs.handleSuccess error

	'change #email': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'email'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #telefon': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'telefon'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #congregation': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'congregation'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #gender': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'gender'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #languages': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'languages'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #bdate': (e) ->
		bdate = e.target.value

		if bdate.indexOf('Invalid') > -1
			Meteor.users.methods.profile.update.call
				field: 'bdate'
				value: ''
		else
			Meteor.users.methods.profile.update.call
				field: 'bdate'
				value: bdate
			, Dialogs.handleSuccess

	'change #pioneer': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'pioneer'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #privilege': (e) ->
		Meteor.users.methods.profile.update.call
			field: 'privilege'
			value: e.target.value
		, Dialogs.handleSuccess
