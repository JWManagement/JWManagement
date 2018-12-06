import i18next from 'i18next'

Meteor.methods

	sendMail: (data) ->
		# recipient
		# sender
		# from
		# subject
		# template
		# data
		# language

		sent = false

		if (data? &&
				data.recipient? && data.recipient != '' &&
				data.sender? &&
				data.from? &&
				data.subject? &&
				data.template? &&
				data.language? &&
				data.data?)

			try
				localTranslate = i18next.getFixedT(data.language)

				data.data.global =
					footer: localTranslate('mail.footer')
					link: localTranslate('mail.link')

				sent = Mailer.send
					to: data.recipient
					from: data.sender + ' <no-reply@jwmanagement.org>'
					replyTo: data.sender + '<' + data.from + '>'
					subject: data.subject
					template: data.template
					data: data.data
			catch e
				console.error e
				throw e

		sent
