import i18next from 'i18next'

isLoading = new ReactiveVar
noState = new ReactiveVar
registerState = new ReactiveVar

Template.firstLogin.helpers

	user: ->
		token = FlowRouter.getQueryParam('token')

		if token.startsWith('3D')
			token = token.substring(2)

		Meteor.users.findOne 'services.password.reset.token': token

	getErrorMessage: -> Session.get('errorMessage')

	isLoading: -> isLoading.get()

	noState: -> noState.get()

	registerState: -> registerState.get()

Template.firstLogin.onCreated ->

	isLoading.set true
	noState.set true

	@autorun ->
		token = FlowRouter.getQueryParam('token')

		if token? && token != ''
			handle = Meteor.subscribe 'userByToken', token
			isLoading.set(!handle.ready())

Template.firstLogin.events

	'click #createAccount': ->
		noState.set(false)
		registerState.set(true)

	'click #haveAccount': ->
		noState.set(false)
		registerState.set(false)

	'change #username': (e) ->
		$('#username').val(e.target.value)

	'submit form': (event) ->
		event.preventDefault()

		token = FlowRouter.getQueryParam('token')

		if registerState.get()
			username = $('#username').val()
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
											Session.set 'errorMessage', i18next.t('firstLogin.tokenError')
								else
									Session.set 'errorMessage', i18next.t('firstLogin.usernameExists')
					else
						Session.set 'errorMessage', i18next.t('firstLogin.usernameMissing')
				else
					Session.set 'errorMessage', i18next.t('firstLogin.agreeTermsMissing')
			else
				Session.set 'errorMessage', i18next.t('firstLogin.tokenMissing')
		else
			username = $('#username').val()
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
