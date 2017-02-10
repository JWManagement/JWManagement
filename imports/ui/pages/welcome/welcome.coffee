import { Messages } from '/imports/api/messages/messages.coffee'

import '/imports/api/resources/singlePageNav.js'
import '/imports/api/resources/wow.js'

import './welcome.tpl.jade'
import './welcome.scss'

R =
	selectedType: new ReactiveVar ''
	latestReleases: new ReactiveVar ''

Template.welcome.helpers

	latestReleases: -> R.latestReleases.get()

	selectedType: -> R.selectedType.get()

Template.welcome.onRendered ->

	R.selectedType.set 'question'
	R.latestReleases.set [ body: ['Loading...'], tag: '0.0.0' ]

	new WOW().init()
	$('.navbar').singlePageNav offset: 70

	HTTP.call 'GET', 'https://api.github.com/repos/JWDeveloper/JWManagement/releases', (e, a) ->
		R.latestReleases.set a.data.map (data, index) -> if index < 3
			body: data.body.replace(/- /g, '').split('\n')
			tag: data.tag_name

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
				, (e, r) ->
					if e
						handleError e
					else
						swal TAPi18n.__('welcome.contact.enquirySuccessful'), '', 'success'

						$('#contactForm')[0].reset()
			else
				Meteor.call 'sendMessage', name, email, type, message, (e, r) ->
					if e
						handleError e
					else
						swal 'Nachricht wurde verschickt!', '', 'success'

						$('#contactForm')[0].reset()
		else
			swal 'Bitte fülle alle Pflichtfelder aus!', '', 'error'
