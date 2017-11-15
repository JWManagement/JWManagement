Meteor.methods

	sendCancelTeam: (shiftId, teamId, message) ->
		shift = Shifts.findOne shiftId
		project = Projects.findOne shift.projectId, fields: name: 1, email: 1

		check { userId: Meteor.userId(), projectId: shift.projectId }, isMember
		check { shiftId: shiftId, teamId: teamId }, isExistingShiftAndTeam

		if message?
			check message, String

		for team in shift.teams when team._id == teamId

			for participant in team.participants when participant.email?
				user = Meteor.users.findOne participant._id, fields: 'profile.language': 1
				project = Projects.findOne shift.projectId, fields: name: 1, email:1
				date = moment(shift.date, 'YYYYDDDD').format('DD.MM.YYYY')
				time = moment(shift.start, 'Hmm').format('H:mm') + ' - ' +  moment(shift.end, 'Hmm').format('H:mm')
				if message == 'missingParticipant'
					message = TAPi18n.__('mail.teamCancellation.missingParticipant', '', user.profile.language)

				Meteor.call 'sendMail',
					recipient: participant.email
					sender: project.name
					from: project.email
					subject: TAPi18n.__('mail.teamCancellation.subject', '', user.profile.language)
					template: 'teamCancellation'
					language: user.profile.language
					data:
						project: project.name
						team: team.name
						name: participant.name
						reason: message
						text: TAPi18n.__('mail.teamCancellation.text', {date: date, time: time} , user.profile.language)
						content: getMailTexts 'teamCancellation', user.profile.language
				, (err, res) -> if err
					console.log 'sendMail failed: ' + err
