import { Pictures } from '/imports/api/pictures/pictures.coffee'
import { ReactiveVar } from 'meteor/reactive-var'
import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { wrs } from '/imports/api/util/delay.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import './navigation.tpl.jade'
import './navigation.scss'

R = latestRelease: new ReactiveVar

Template.navigation.helpers

	name: -> TAPi18n.__('navigation.' + FlowRouter.getRouteName())

	target: ->
		if Session.get('parent')
			if Session.get('target')
				Session.get('target')
			else if Session.get('parent') == 'settings' && FR.getProjectId()
				FlowRouter.path 'settings',
					projectId: FR.getProjectId()
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'admin' && FR.getProjectId()
				FlowRouter.path 'admin',
					projectId: FR.getProjectId()
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'home'
				FlowRouter.path 'home', language: TAPi18n.getLanguage()

	picture: -> Pictures.findOne userId: Meteor.userId()

	toLower: (str) -> str?.toLowerCase()

	latestRelease: -> R.latestRelease.get()

	langIsDe: -> TAPi18n.getLanguage() == 'de'

Template.navigation.onCreated ->

	Meteor.subscribe 'profilePicture', Meteor.userId()

	HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases/latest', (e, a) ->
		R.latestRelease.set
			tag: a.data.tag_name
			new: moment().diff(a.data.published_at, 'days') < 3

Template.navigation.onDestroyed ->

	Session.set 'target', undefined

Template.navigation.events

	'click .unimpersonate': -> Impersonate.undo -> wrs -> FlowRouter.go 'support'

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
