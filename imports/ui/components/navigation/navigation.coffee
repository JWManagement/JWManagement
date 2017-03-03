import { ReactiveVar } from 'meteor/reactive-var'
import { Dialogs } from '/imports/util/dialogs.coffee'
import { wrs } from '/imports/util/delay.coffee'

import './navigation.tpl.jade'
import './navigation.scss'

R = latestRelease: new ReactiveVar

Template.navigation.helpers

	name: -> TAPi18n.__('navigation.' + FlowRouter.getRouteName())

	target: ->
		if Session.get('parent')
			if Session.get('target')
				Session.get('target')
			else if Session.get('parent') == 'settings' && FlowRouter.getParam('projectId')
				FlowRouter.path 'settings',
					projectId: FlowRouter.getParam('projectId')
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'admin' && FlowRouter.getParam('projectId')
				FlowRouter.path 'admin',
					projectId: FlowRouter.getParam('projectId')
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'home'
				FlowRouter.path 'home', language: TAPi18n.getLanguage()

	picture: -> Pictures.findOne userId: Meteor.userId()

	toLower: (str) -> str?.toLowerCase()

	latestRelease: -> R.latestRelease.get()

Template.navigation.onCreated ->

	Meteor.subscribe 'profilePicture', Meteor.userId()

	HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases/latest', (e, a) ->
		R.latestRelease.set
			tag: a.data.tag_name
			new: moment().diff(a.data.published_at, 'days') < 3

Template.navigation.onDestroyed ->

	Session.set 'target', undefined

Template.navigation.events

	'click .setLanguage': (e) ->
		language = $(e.target).closest('a').attr('lang')
		TAPi18n.setLanguage language
		wrs -> FlowRouter.setParams language: language

	'click #logout': (e) ->
		e.preventDefault()

		Dialogs.swalYesNo
			swal: 'logout'
			type: 'info'
			close: false
			doConfirm: ->
				swal title: TAPi18n.__('navigation.loggingOut'), showConfirmButton: false
				Meteor.logout -> Dialogs.swalClose()
