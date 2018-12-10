import i18next from 'i18next'
import moment from 'moment'

Meteor.methods

	sendReversal: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId
		project = Projects.findOne shift.projectId, fields: name: 1, email: 1
		user = Meteor.users.findOne userId, fields: profile: 1

		if user? and shift?
			check { userId: Meteor.userId(), projectId: shift.projectId }, isShiftScheduler

			thisMoment = moment(shift.date, 'YYYYDDDD')
			thisMoment.locale(user.profile.language)
			date = thisMoment.format('dddd, DD.MM.YYYY')
			time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')

			dateTime = date: date, time: time
			name = user.profile.firstname + ' ' + user.profile.lastname
			teamNr = shift.teams.map((e) -> e._id).indexOf(teamId)

			localTranslate = i18next.getFixedT(user.profile.language)

			Meteor.call 'sendMail',
				recipient: user.profile.email
				sender: project.name
				from: project.email
				subject: localTranslate('mail.reversal.subject')
				template: 'reversal'
				language: user.profile.language
				data:
					project: project.name
					name: name
					team: shift.teams[teamNr].name
					datetime: localTranslate('mail.reversal.datetime', dateTime)
					content: getMailTexts 'reversal', localTranslate
			, (err, res) -> if err
				console.log 'sendMail failed: ' + err
