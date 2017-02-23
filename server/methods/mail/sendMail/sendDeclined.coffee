Meteor.methods

	sendDeclined: (shiftId, teamId, userId) ->
		shift = Shifts.findOne shiftId

		if shift?
			project = Projects.findOne shift.projectId, fields: name: 1, email: 1
			user = Meteor.users.findOne userId, fields: profile: 1

			check { userId: Meteor.userId(), projectId: shift.projectId }, isMember

			if user?
				thisMoment = moment(shift.date, 'YYYYDDDD')
				thisMoment.locale(user.profile.language)
				date = thisMoment.format('dddd, DD.MM.YYYY')
				time = moment(shift.start, 'Hmm').format('HH:mm') + ' - ' + moment(shift.end, 'Hmm').format('HH:mm')
				name = user.profile.firstname + ' ' + user.profile.lastname

			Meteor.call 'sendMail',
				recipient: user.profile.email
				sender: project.name
				from: project.email
				subject: TAPi18n.__('mail.declined.subject', '', user.profile.language)
				template: 'declined'
				language: user.profile.language
				data:
					project: project.name
					name: name
					datetime: TAPi18n.__('mail.declined.datetime', {date: date, time: time}, user.profile.language)
					content: getMailTexts 'declined', user.profile.language
			Push.send
			 from: project.name
			 title: TAPi18n.__('push.declined.headline', user.profile.language)
			 text: TAPi18n.__('push.declined.text1', {date: date, time: time}, user.profile.language)
			 query: userId: user._id
			, (err, res) ->
				if err
					console.log 'sendMail failed: ' + err
				else
					teamNr = shift.teams.map((e) -> e._id).indexOf(teamId)
					declinedNr = shift.teams[teamNr].declined.map((e) -> e._id).indexOf(userId)
					set = {}
					set['teams.' + teamNr + '.declined.' + declinedNr + '.informed'] = true
					Shifts.update shift._id, $set: set
