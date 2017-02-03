export Check =

	Email: Match.Where (email) ->
		check email, String

		unless email.length < 255 && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test email
			throw new Meteor.Error 'error', 'Please provide a valid E-Mail Address'
		true
