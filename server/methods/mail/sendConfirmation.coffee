moment = require('moment')
{ send } = require('./send.coffee')

Meteor.methods

	sendConfirmation: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId
		project = Projects.findOne shift.projectId, fields: name: 1, email: 1
		user = Meteor.users.findOne userId, fields: profile: 1

		if user? and shift?
			thisMoment = moment(shift.date, 'YYYYDDDD')
			thisMoment.locale(user.profile.language)
			date = thisMoment.format('dddd, DD.MM.YYYY')
			time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
			name = user.profile.firstname + ' ' + user.profile.lastname
			shiftData = {}
			shiftData.teams = []

			for team in shift.teams when team.participants.length > 0
				shiftData.teams.push team

		send
			recipient: user.profile.email
			sender: project.name
			from: project.email
			subject: TAPi18n.__('mail.confirmation.subject', '', user.profile.language)
			template: 'confirmation'
			language: user.profile.language
			data:
				project: project.name
				name: name
				datetime: TAPi18n.__('mail.confirmation.datetime', {date: date, time: time}, user.profile.language)
				shift: shiftData
				content: getMailTexts 'confirmation', user.profile.language
		, (err, res) ->
			if err
				console.log 'sendMail failed: ' + err
			else
				teamNr = shift.teams.map((e) -> e._id).indexOf(teamId)
				participantNr = shift.teams[teamNr].participants.map((e) -> e._id).indexOf(userId)
				set = {}
				set['teams.' + teamNr + '.participants.' + participantNr + '.informed'] = true
				Shifts.update shiftId, $set: set
