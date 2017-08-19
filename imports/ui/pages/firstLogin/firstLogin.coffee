import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import './firstLogin.tpl.jade'
import './firstLogin.scss'

Template.firstLogin.onCreated ->

	token = FR.getToken()

	if token? && token != ''
		@subscribe 'userByToken', token

Template.firstLogin.helpers

	user: ->
		token = FR.getToken()
		Meteor.users.findOne 'services.password.reset.token': token

	loggingIn: -> Meteor.loggingIn() || Meteor.userId()

Template.firstLogin.events

	'submit form': (event) ->
		event.preventDefault()

		submit = $('#submit').ladda()
		submit.ladda('start')

		username = $('#username').val()
		password1 = $('#password1').val()
		password2 = $('#password2').val()
		agreeTerms = $('#agreeTerms').prop('checked')
		token = FR.getToken()

		try
			if username.indexOf('@') < 0 && username.indexOf('.') < 0
				if token
					if agreeTerms
						if username
							if Meteor.users.helpers.areValidPasswords password1, password2
								Meteor.users.methods.getters.usernameAvailable.call
									username: username
								, Dialogs.callback
									onError: -> submit.ladda('stop')
									onSuccess: ->
										Meteor.users.methods.init.call
											token: token
											username: username
											password: password1
										, Dialogs.callback
											onError: -> submit.ladda('stop')
											onSuccess: ->
												Meteor.loginWithPassword username, password1, ->
													FlowRouter.go 'home'
						else
							throw new Meteor.Error 'usernameMissing', 'error'
					else
						throw new Meteor.Error 'agreeTermsMissing', 'error'
				else
					throw new Meteor.Error 'tokenMissing', 'error'
			else
				throw new Meteor.Error 'usernameUnavailable', 'error'
		catch e
			submit.ladda('stop')
			Dialogs.feedback e
