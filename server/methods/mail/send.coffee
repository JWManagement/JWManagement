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
			footer: i18next.t('mail.footer', '', data.language)
			link: i18next.t('mail.link', '', data.language)

		data.data.content =
			headline: i18next.t('mail.' + data.from + '.headline', '', data.language)
			hello: i18next.t('mail.' + data.from + '.hello', '', data.language)
			text1: i18next.t('mail.' + data.from + '.text1', '', data.language)
			text2: i18next.t('mail.' + data.from + '.text2', '', data.language)
			changed: i18next.t('mail.' + data.from + '._changed', '', data.language)
			button: i18next.t('mail.' + data.from + '.button', '', data.language)

		if Meteor.user().notifications?.push
			sent = Push.send
				from: project.name
				title: i18next.t('push.teamCancellation.headline', user.profile.language)
				text: i18next.t('push.teamCancellation.text', {date: date, time: time} , user.profile.language)
				query: userId: user._id
		else
			sent = Mailer.send
				to: data.recipient
				from: data.sender + ' <no-reply@jwmanagement.org>'
				replyTo: data.sender + '<' + data.from + '>'
				subject: data.subject
				template: data.template
				data: data.data

	sent
