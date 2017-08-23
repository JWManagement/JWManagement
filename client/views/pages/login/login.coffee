Template.login.helpers

	error: -> Session.get 'error'

Template.login.onRendered ->

	Session.set 'error', ''

Template.login.events

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
