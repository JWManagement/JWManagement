import './resetPassword.tpl.jade'

Template.resetPassword.helpers

	user: ->
		token = FlowRouter.getQueryParam('token')
		Meteor.users.findOne 'services.password.reset.token': token

	loggingIn: -> Meteor.loggingIn() || Meteor.userId()

Template.resetPassword.onCreated ->

	token = FlowRouter.getQueryParam('token')

	if token? && token != ''
		@subscribe 'userByToken', token

Template.resetPassword.events

	'submit form': (e, a) ->
		e.preventDefault()

		submit = $('[type="submit"]').ladda()
		submit.ladda 'start'

		pass1 = e.target['0'].value
		pass2 = e.target['1'].value
		token = FlowRouter.getQueryParam('token')

		try
			if !token? || token == ''
				throw new Meteor.Error 'invalidToken', 'error'

			if Meteor.users.helpers.areValidPasswords pass1, pass2
				Meteor.users.methods.profile.password.reset.call
					token: token
					password: pass1
				, (err, username) ->
					if err
						submit.ladda 'stop'
						swal TAPi18n.__(err.error) , '', err.reason
					else
						language = FlowRouter.getParam('language')

						Meteor.loginWithPassword username, pass1, (e) -> unless e
							FlowRouter.go 'home', language: language
		catch e
			submit.ladda 'stop'

			swal TAPi18n.__(e.error), '', e.reason
