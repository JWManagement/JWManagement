import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { StringUtils } from '/imports/api/util/stringUtils.coffee'

import './firstLogin.tpl.jade'
import './firstLogin.scss'

isLoading = new ReactiveVar
noState = new ReactiveVar
registerState = new ReactiveVar

Template.firstLogin.onCreated ->

	isLoading.set true
	noState.set true

	@autorun ->
		token = FR.getToken()

		if token? && token != ''
			handle = Meteor.subscribe 'userByToken', token
			isLoading.set(!handle.ready())

Template.firstLogin.helpers

	user: ->
		token = FR.getToken()
		Meteor.users.findOne 'services.password.reset.token': token

	loggingIn: -> Meteor.loggingIn() || Meteor.userId()

	getErrorMessage: -> Session.get('errorMessage')

	isLoading: -> isLoading.get()

	noState: -> noState.get()

	registerState: -> registerState.get()

Template.firstLogin.events

	'click #createAccount': ->
		noState.set(false)
		registerState.set(true)

	'click #haveAccount': ->
		noState.set(false)
		registerState.set(false)

	'change #username': (e) ->
		$('#username').val(StringUtils.cleanedUsername(e.target.value))

	'submit form': (event) ->
		event.preventDefault()

		token = FR.getToken()

		if registerState.get()
			username = StringUtils.cleanedUsername($('#username').val())
			password1 = $('#password1').val()
			password2 = $('#password2').val()
			agreeTerms = $('#agreeTerms').prop('checked')

			if token
				if agreeTerms
					if username
						if Meteor.areValidPasswords password1, password2
							Meteor.call 'usernameAvailable', username, (err, res) ->
								if res
									Meteor.call 'userFirstLogin', token, username, password1, (err, res) ->
										if typeof res == 'object' && res.done
											Meteor.loginWithPassword username, password1, -> FlowRouter.go 'home'
										else
											Session.set 'errorMessage', TAPi18n.__('firstLogin.tokenError')
								else
									Session.set 'errorMessage', TAPi18n.__('firstLogin.usernameExists')
					else
						Session.set 'errorMessage', TAPi18n.__('firstLogin.usernameMissing')
				else
					Session.set 'errorMessage', TAPi18n.__('firstLogin.agreeTermsMissing')
			else
				Session.set 'errorMessage', TAPi18n.__('firstLogin.tokenMissing')
		else
			username = StringUtils.cleanedUsername($('#username').val())
			password = $('#password').val()

			if username
				if password
					Meteor.loginWithPassword username, password, (error) ->
						if error
							Meteor.setTimeout ->
								submit.ladda('stop')
								Session.set 'errorMessage', error.reason
							, 500
						else
							Meteor.loginWithPassword username, password, ->
								Meteor.call 'registerUserForProject', Meteor.userId(), token

								FlowRouter.go 'home'
