Meteor.areValidPasswords = (password1, password2) ->
	value = false

	if password1 == password2
		if password1.length >= 8
			value = true
		else if Meteor.isClient
			Session.set 'errorMessage', i18next.t('password.tooShort')
	else if Meteor.isClient
		Session.set 'errorMessage', i18next.t('password.notMatching')

	value
