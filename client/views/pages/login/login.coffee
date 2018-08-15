Template.login.helpers

	error: -> Session.get 'error'

Template.login.onCreated ->

	if FlowRouter.getRouteName() == 'dashboard.details'
		if !Meteor.userId() && !Meteor.loggingIn()
			FlowRouter.go('welcome', { language: 'en' });

Template.login.onRendered ->

	Session.set 'error', ''

Template.login.events

	'change #username': (e) ->
		$('#username').val(Validations.cleanedUsername(e.target.value))

	'submit form': (event) ->
		event.preventDefault()
		Session.set 'error', ''

		submit = $('#submit').ladda()
		submit.ladda('start')

		username = Validations.cleanedUsername($('#username').val())
		password = $('#password').val()

		if username != '' && password != ''
			Meteor.loginWithPassword username, password, (error) ->
				if error
					Meteor.setTimeout ->
						submit.ladda('stop')
						Session.set 'error', error.reason
					, 500
				else
					language = Meteor.user().profile.language

					if language? && TAPi18n.getLanguage() != language
						wrs -> FlowRouter.setParams language: language
		else
			submit.ladda('stop')
			Session.set 'error', 'Mssing field'
