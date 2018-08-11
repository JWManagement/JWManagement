Template.resetPassword.helpers

	error: -> Session.get 'errorMessage'

	user: ->
		token = FlowRouter.getQueryParam('token')
		Meteor.users.findOne 'services.password.reset.token': token

	loggingIn: -> Meteor.loggingIn() || Meteor.userId()

Template.resetPassword.onCreated ->

	Session.set 'errorMessage', ''
	token = FlowRouter.getQueryParam('token')

	if token? && token != ''
		@subscribe 'userByToken', token

Template.resetPassword.events

	'submit form': (e, a) ->
		e.preventDefault()

		submit = $('[type="submit"]').ladda()
		submit.ladda 'start'

		Session.set 'errorMessage', ''
		pass1 = e.target['0'].value
		pass2 = e.target['1'].value
		token = FlowRouter.getQueryParam('token')

		if token? && token != ''
			if Meteor.areValidPasswords pass1, pass2
				Meteor.call 'resetAccountPassword', token, pass1, (err, username) ->
					if err
						swal err.reason, '', 'error'
						submit.ladda 'stop'
					else
						Meteor.loginWithPassword username, pass1, (e) -> unless e
							language = Meteor.user().profile?.language
							FlowRouter.go 'home', language: language
			else
				submit.ladda 'stop'
		else
			Session.set 'errorMessage', 'Invalid token'
			submit.ladda 'stop'

		false
