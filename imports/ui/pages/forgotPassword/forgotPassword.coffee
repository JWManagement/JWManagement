import { Dialogs } from '/imports/util/dialogs.coffee'

import './forgotPassword.tpl.jade'

multipleUsernames = new Tracker.Dependency
usernameList = []

Template.forgotPassword.helpers

	multipleUsernames: ->
		multipleUsernames.depend()
		usernameList

	isChecked: (index) -> if index == 0 then 'checked'

Template.forgotPassword.events

	'change #email': (e) ->
		usernameList = []
		multipleUsernames.changed()

	'submit form': (e) ->
		e.preventDefault()

		submit = $('#submit').ladda()
		submit.ladda 'start'

		email = $('#email').val()
		username = $('[name="username"]:checked').val()

		Meteor.users.methods.profile.password.getResetToken.call
			email: email
			username: username
		, (e, r) ->
			submit.ladda 'stop'

			Dialogs.feedback e

			if e.error == 'multipleAccountsForThisEmail'
				Meteor.users.methods.getters.getUsernamesForEmail.call
					email: email
				, Dialogs.callback onSuccess: (res) ->
					usernameList = res
					multipleUsernames.changed()
