moment = require('moment')
{ send } = require('./send.coffee')

Meteor.methods

	sendDeclined: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId

		if shift?
			project = Projects.findOne shift.projectId, fields: name: 1, email: 1
			user = Meteor.users.findOne userId, fields: profile: 1

			if user?
				thisMoment = moment(shift.date, 'YYYYDDDD')
				thisMoment.locale(user.profile.language)
				date = thisMoment.format('dddd, DD.MM.YYYY')
				time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
				name = user.profile.firstname + ' ' + user.profile.lastname

			sent = Meteor.call 'sendMail',
				recipient: user.profile.email
				sender: project.name
				from: project.email
				subject: i18next.t('mail.declined.subject', '', user.profile.language)
				template: 'declined'
				language: user.profile.language
				data:
					project: project.name
					name: name
					datetime: i18next.t('mail.declined.datetime', {date: date, time: time}, user.profile.language)
					content: getMailTexts 'declined', user.profile.language

			if sent
				teamNr = shift.teams.map((e) -> e._id).indexOf(teamId)
				declinedNr = shift.teams[teamNr].declined.map((e) -> e._id).indexOf(userId)
				set = {}
				set['teams.' + teamNr + '.declined.' + declinedNr + '.informed'] = true
				Shifts.update shift._id, $set: set
