import i18next from 'i18next'
import moment from 'moment'

Meteor.methods

	sendCancelTeam: (shiftId, teamId, message) ->
		shift = Shifts.findOne shiftId
		project = Projects.findOne shift.projectId, fields: name: 1, email: 1

		for team in shift.teams when team._id == teamId
			for participant in team.participants
				user = Meteor.users.findOne participant._id, fields: profile: 1

				if user.profile.email?
					localTranslate = i18next.getFixedT(user.profile.language)

					project = Projects.findOne shift.projectId, fields: name: 1, email:1
					date = moment(shift.date, 'YYYYDDDD').format('DD.MM.YYYY')
					time = moment(shift.start, 'Hmm').format('H:mm') + ' - ' +  moment(shift.end, 'Hmm').format('H:mm')

					if message == 'missingParticipant'
						message = localTranslate('mail.teamCancellation.missingParticipant')

					Meteor.call 'sendMail',
						recipient: participant.email
						sender: project.name
						from: project.email
						subject: localTranslate('mail.teamCancellation.subject')
						template: 'teamCancellation'
						language: user.profile.language
						data:
							project: project.name
							team: team.name
							name: participant.name
							reason: message
							text: localTranslate('mail.teamCancellation.text', {date: date, time: time})
