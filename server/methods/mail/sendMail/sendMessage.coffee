Meteor.methods

	sendMessage: (name, email, subject, message) ->
		if name? && name != '' && email? && email != '' && subject? && subject != '' && message? && message != ''
			text = 'Name:    ' + name + '\n'
			text += 'Email:   ' + email + '\n'
			text += 'Subject: ' + subject + '\n'
			text += 'Message: ' + message

			sent = Email.send
				to: 'support@jwmanagement.org'
				from: 'JWManagement Notification <no-reply@jwmanagement.org>'
				subject: 'New Message: ' + subject
				text: text

			if sent
				true
			else
				false
		else
			false
