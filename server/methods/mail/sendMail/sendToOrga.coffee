Meteor.methods

	sendToOrga: (projectId, type, shiftId, teamId) ->
		project = Projects.findOne projectId, fields: name: 1, email: 1, language: 1
		if shiftId? and teamId?
			shift = Shifts.findOne shiftId

			check { shiftId: shiftId, teamId: teamId }, isExistingShiftAndTeam

			date = moment(shift.date, 'YYYYDDDD').format('DD.MM.YYYY')
			time = moment(shift.start, 'Hmm').format('H:mm') + ' - ' +  moment(shift.end, 'Hmm').format('H:mm')

			for team in shift.teams when team._id == teamId
				teamName = team.name

		check projectId, isExistingProject

		Meteor.call 'sendMail',
			recipient: project.email
			sender: project.name + ' <' + project.email + '>'
			subject: TAPi18n.__('mail.toOrga.subject.' + type, '', project.language)
			template: 'toOrga'
			language: user.profile.language
			data:
				project: project.name
				text: TAPi18n.__('mail.toOrga.text.' + type, {date: date, time: time, team: team.name} , project.language)
				content: getMailTexts 'toOrga', project.language
		, (err, res) -> if err
			console.log 'sendMail failed: ' + err
