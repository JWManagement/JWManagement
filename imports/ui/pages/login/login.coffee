import { StringUtils } from '/imports/api/util/stringUtils.coffee'

import './login.tpl.jade'
import './login.scss'

Template.login.helpers

	error: -> Session.get 'error'

Template.login.onRendered ->

	Session.set 'error', ''

Template.login.events

	'change #username': (e) ->
		$('#username').val(StringUtils.cleanedUsername(e.target.value))

	'submit form': (event) ->
		event.preventDefault()
		Session.set 'error', ''

		submit = $('#submit').ladda()
		submit.ladda('start')

		username = StringUtils.cleanedUsername($('#username').val())
		password = $('#password').val()

		if username != '' && password != ''
			Meteor.loginWithPassword username, password, (error) ->
				if error
					Meteor.setTimeout ->
						submit.ladda('stop')
						Session.set 'error', error.reason
					, 100
				else
					language = Meteor.user().profile.language

					if language? && TAPi18n.getLanguage() != language
						wrs -> FlowRouter.setParams language: language
		else
			submit.ladda('stop')
			Session.set 'error', TAPi18n.__('feedback.error.missingField')
