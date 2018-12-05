moment = require('moment')

Meteor.methods

	sendUnderstaffed: (shiftId, teamId) ->
		shift = Shifts.findOne shiftId
		project = Projects.findOne shift.projectId, fields: name: 1, email: 1
		shiftData = teams: []
		tlNeeded = true

		for team in shift.teams when team._id = teamId
			shiftData.teams[0] = team

			tlNeeded = false if team.participants.filter((p) -> p.teamleader).length >= 1
			tlNeeded = false if team.pending.filter((p) -> p.teamleader).length >= 1

		if tlNeeded
			users = Roles.getUsersInRole Permissions.teamleader, shift.tagId, fields: profile: 1
			users = users.fetch().filter (u) -> Roles.userIsInRole u._id, Permissions.participant, shift.tagId
			type = 'teamleader'
		else
			users = Roles.getUsersInRole Permissions.member, shift.projectId, fields: profile: 1
			users = users.fetch()
			type = 'participant'

		for user in users.filter((u) -> u.profile.shortTermCalls == true)
			thisMoment = moment(shift.date, 'YYYYDDDD')
			thisMoment.locale(user.profile.language)
			date = thisMoment.format('dddd, DD.MM.YYYY')
			time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
			name = user.profile.firstname + ' ' + user.profile.lastname

			localTranslate = i18next.getFixedT(user.profile.language)

			Meteor.call 'sendMail',
				recipient: user.profile.email
				sender: project.name
				from: project.email
				subject: localTranslate('mail.understaffed.subject')
				template: 'understaffed'
				language: user.profile.language
				data:
					project: project.name
					name: name
					type: localTranslate('role.' + type)
					datetime: localTranslate('mail.understaffed.datetime', {date: date, time: time})
					shift: shiftData
					content: getMailTexts 'understaffed', localTranslate
