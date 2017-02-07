export sendMessage = (name, email, subject, message) ->
	if name? && name != '' && email? && email != '' && subject? && subject != '' && message? && message != ''
		sent = Email.send
			to: 'support@jwmanagement.org'
			from: 'JWManagement Notification <no-reply@jwmanagement.org>'
			replyTo: name + '<' + email + '>'
			subject: subject
			text: message

		if sent
			true
		else
			false
	else
		false
