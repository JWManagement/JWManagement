import i18next from 'i18next'
import moment from 'moment'

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

			localTranslate = i18next.getFixedT(user.profile.language)

			sent = Meteor.call 'sendMail',
				recipient: user.profile.email
				sender: project.name
				from: project.email
				subject: localTranslate('mail.confirmation.subject')
				template: 'confirmation'
				language: user.profile.language
				data:
					project: project.name
					name: name
					datetime: localTranslate('mail.confirmation.datetime', {date: date, time: time})
					shift: shiftData
					content: getMailTexts 'confirmation', localTranslate

			if sent
				teamNr = shift.teams.map((e) -> e._id).indexOf(teamId)
				participantNr = shift.teams[teamNr].participants.map((e) -> e._id).indexOf(userId)
				set = {}
				set['teams.' + teamNr + '.participants.' + participantNr + '.informed'] = true

				console.log shiftId
				console.log set

				Shifts.update shiftId, $set: set

	sendConfirmWeek: (projectId, tagId, weekId) ->
		project = Projects.findOne projectId, fields: name: 1, email: 1
		shifts = Shifts.find
			projectId: projectId
			tagId: tagId
			weekId: weekId

		check { userId: Meteor.userId(), projectId: projectId }, isShiftScheduler

		if shifts?
			for shift in shifts.fetch()
				for team in shift.teams
					for participant in team.participants
						if !participant.informed
							Meteor.call 'sendConfirmation', shift._id, team._id, participant._id

					for declinedUser in team.declined
						if !declinedUser.informed
							Meteor.call 'sendDeclined', shift._id, team._id, declinedUser._id

			return true

		else
			throw new Meteor.Error 404, 'Shifts with weekId: ' + weekId + ' not found'
