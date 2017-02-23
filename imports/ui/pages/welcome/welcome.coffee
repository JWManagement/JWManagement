import { ReactiveVar } from 'meteor/reactive-var'
import { Messages } from '/imports/api/messages/messages.coffee'
import { Dialogs } from '/imports/util/dialogs.coffee'

import '/imports/api/resources/bootstrap.min.js'
import '/imports/api/resources/singlePageNav.js'
import '/imports/api/resources/wow.js'

import '/imports/ui/components/languageSwitch/languageSwitch.coffee'

import './welcome.tpl.jade'
import './welcome.scss'

R =
	selectedType: new ReactiveVar ''
	latestReleases: new ReactiveVar ''

Template.welcome.helpers

	latestReleases: -> R.latestReleases.get()

	selectedType: -> R.selectedType.get()

Template.welcome.onRendered ->

	R.selectedType.set ''
	R.latestReleases.set [ body: ['Loading...'], tag: '0.0.0' ]

	new WOW().init()
	$('.navbar').singlePageNav offset: 70

	HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases', (e, a) ->
		R.latestReleases.set a.data.map((data, index) ->
			body: data.body.replace(/- /g, '').split('\n')
			tag: data.tag_name
		).splice 0, 3

Template.welcome.events

	'click .navbar-collapse a': -> $('.navbar-collapse').collapse('hide')

	'click #toLogin': -> FlowRouter.go 'login', language: FlowRouter.getParam('language')

	'click #toDashboard': -> FlowRouter.go 'home', language: FlowRouter.getParam('language')

	'change #type': (e) -> R.selectedType.set $(e.target).find('option:selected').attr('type')

	'submit form': (e) ->
		e.preventDefault()

		name = $('#name').val()
		email = $('#email').val()
		type = $('#type :selected').attr('type')
		congregation = $('#congregation').val()
		message = $('#message').val()

		if name != '' && email != '' && type != '' && message != '' && (congregation != '' || type != 'enquiry')
			if type == 'enquiry'
				Messages.methods.addProjectEnquiry.call
					name: name
					email: email
					congregation: congregation
					message: message
					language: TAPi18n.getLanguage()
				, Dialogs.callback onSuccess: ->
					swal TAPi18n.__('feedback.success.enquirySent'), '', 'success'
					$('#contactForm')[0].reset()
			else
				# TODO: migrate to messages
				Meteor.call 'sendMessage', name, email, type, message, Dialogs.callback onSuccess: ->
					swal TAPi18n.__('feedback.success.messageSent'), '', 'success'
					$('#contactForm')[0].reset()
		else
			swal TAPi18n.__('feedback.error.missingField'), '', 'error'
