import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { send } from '../send.coffee'
import { getMailTexts } from '../helpers.coffee'

export sendResetPassword = (obj) ->

	if obj.email == '' then throw new Meteor.Error 'emailMissing', 'error'

	token = Random.id 43
	user = {}
	find = 'profile.email': obj.email.toLowerCase()

	if obj.username? then find['username'] = obj.username

	users = Meteor.users.find(find).fetch()

	if users.length == 0
		throw new Meteor.Error 'noUserForThisEmail', 'error'
	else if users.length > 1
		throw new Meteor.Error 'multipleAccountsForThisEmail', 'warning'
	else
		user = users[0]

	Meteor.users.update find, $set: 'services.password.reset': token: token

	send
		recipient: obj.email
		sender: 'JWManagement'
		from: 'support@jwmanagement.org'
		subject: TAPi18n.__('mail.resetPassword.subject', '', user.profile.language)
		template: 'resetPassword'
		language: user.profile.language
		data:
			token: token
			language: user.profile.language
			content: getMailTexts 'resetPassword', user.profile.language
