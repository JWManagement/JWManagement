Meteor.areValidPasswords = (password1, password2) ->
	value = false

	if password1 == password2
		if password1.length >= 8
			value = true
		else if Meteor.isClient
			Session.set 'errorMessage', TAPi18n.__('password.tooShort')
	else if Meteor.isClient
		Session.set 'errorMessage', TAPi18n.__('password.notMatching')

	value

Meteor.isThisWeek = (date) ->
	firstDay = moment().startOf('isoWeek')
	lastDay = moment().endOf('isoWeek')

	moment(date, 'YYYYDDDD').isBetween(firstDay, lastDay, null, '[]')
