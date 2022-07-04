import i18next from 'i18next'
import moment from 'moment'

Meteor.methods

	sendTeamUpdate: (shiftId, teamId, type) ->
		shift = Shifts.findOne shiftId
		project = Projects.findOne shift.projectId, fields: name: 1, email: 1, showCongregationName: 1

		check { userId: Meteor.userId(), projectId: shift.projectId }, isMember
		# fails sometimes because ? let's see what the logging beneath reveals
		# check { userId: Meteor.userId(), tagId: shift.tagId }, isTagParticipant

		if shift?
			time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
			shiftData = {}
			shiftData.teams = []

		for team in shift.teams when team._id == teamId
			if project.showCongregationName
				for participant in team.participants
					user = Meteor.users.findOne participant._id, fields: profile: 1
					if user.profile.congregation
						participant.name = participant.name + ' (' + user.profile.congregation + ')'
			shiftData.teams[0] = team

			for participant in team.participants when participant.informed
				if type != 'participant' || participant.thisTeamleader
					user = Meteor.users.findOne participant._id, fields: profile: 1

					if user.profile?
						thisMoment = moment(shift.date, 'YYYYDDDD')
						thisMoment.locale(user.profile.language)
						date = thisMoment.format('dddd, DD.MM.YYYY')

						name = user.profile.firstname + ' ' + user.profile.lastname
						localTranslate = i18next.getFixedT(user.profile.language)

						Meteor.call 'sendMail',
							recipient: user.profile.email
							sender: project.name
							from: project.email
							subject: localTranslate('mail.teamUpdate.subject')
							template: 'teamUpdate'
							language: user.profile.language
							data:
								project: project.name
								name: name
								type: localTranslate('mail.teamUpdate.changed.' + type)
								datetime: localTranslate('mail.teamUpdate.datetime', {date: date, time: time})
								shift: shiftData
								content: getMailTexts 'teamUpdate', localTranslate
						, (err, res) -> if err
							console.log 'sendMail failed: ' + err

		true
