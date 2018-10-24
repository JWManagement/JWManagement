{ Mailer } = require 'meteor/lookback:emails'

exports.send = (data) ->
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

		data.data.content =
			headline: TAPi18n.__('mail.' + data.from + '.headline', '', data.language)
			hello: TAPi18n.__('mail.' + data.from + '.hello', '', data.language)
			text1: TAPi18n.__('mail.' + data.from + '.text1', '', data.language)
			text2: TAPi18n.__('mail.' + data.from + '.text2', '', data.language)
			changed: TAPi18n.__('mail.' + data.from + '._changed', '', data.language)
			button: TAPi18n.__('mail.' + data.from + '.button', '', data.language)

		if Meteor.user().notifications?.push
			sent = Push.send
				from: project.name
				title: TAPi18n.__('push.teamCancellation.headline', user.profile.language)
				text: TAPi18n.__('push.teamCancellation.text', {date: date, time: time} , user.profile.language)
				query: userId: user._id
		else
			Mailer.send
				to: data.recipient
				from: data.sender + ' <no-reply@jwmanagement.org>'
				replyTo: data.sender + '<' + data.from + '>'
				subject: data.subject
				template: data.template
				data: data.data

			sent = true

	sent
