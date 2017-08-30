Meteor.methods

	sendResetPassword: (obj) ->
		check obj, Object
		check obj.email, String

		if obj.email == ''
			throw new Meteor.Error 500, 'Email not set'

		token = Random.id 43
		user = {}
		find = 'profile.email': obj.email.toLowerCase()

		if obj.username?
			find['username'] = obj.username

		users = Meteor.users.find(find).fetch()

		if users.length == 0
			throw new Meteor.Error 404, ''
		else if users.length > 1
			throw new Meteor.Error 420, ''
		else
			user = users[0]

		Meteor.users.update find, $set: 'services.password.reset': token: token

		Meteor.call 'sendMail',
			recipient: obj.email
			sender: 'JW Management'
			from: 'support@jwmanagement.org'
			subject: TAPi18n.__('mail.resetPassword.subject', '', user.profile.language)
			template: 'resetPassword'
			language: user.profile.language
			data:
				token: token
				language: user.profile.language
				content: getMailTexts 'resetPassword', user.profile.language
		, (err, res) ->
			if err
				console.log 'sendMail failed: ' + err
			else
				true
