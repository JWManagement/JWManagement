import { Mailer } from 'meteor/lookback:emails'

export send = (data) ->
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

		data.data.global =
			footer: TAPi18n.__('mail.footer', '', data.language)
			link: TAPi18n.__('mail.link', '', data.language)

		sent = Mailer.send
			to: data.recipient
			from: data.sender + ' <no-reply@jwmanagement.org>'
			replyTo: data.sender + '<' + data.from + '>'
			subject: data.subject
			template: data.template
			data: data.data

	sent
