Template.firstLogin.helpers

	getErrorMessage: -> Session.get('errorMessage')

Template.firstLogin.events

	'submit form': (event) ->
		event.preventDefault()

		username = $('#username').val()
		password1 = $('#password1').val()
		password2 = $('#password2').val()
		token = FlowRouter.getQueryParam('token')

		if username
			if Meteor.areValidPasswords password1, password2
				Meteor.call 'usernameAvailable', username, (err, res) ->
					if res
						Meteor.call 'userFirstLogin', token, username, password1, (err, res) ->
							if res
								Meteor.loginWithPassword username, password1
								FlowRouter.go 'home'
							else
								Session.set 'errorMessage', TAPi18n.__('firstLogin.tokenError')
					else
						Session.set 'errorMessage', TAPi18n.__('firstLogin.usernameExists')
		else
			Session.set 'errorMessage', TAPi18n.__('firstLogin.usernameMissing')
