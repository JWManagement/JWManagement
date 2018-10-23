Meteor.methods

	sendJoinProject: (projectId, userId) ->
		project = Projects.findOne projectId, fields: name: 1, email: 1
		user = Meteor.users.findOne userId, fields: profile: 1

		check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		name = user.profile.firstname + ' ' + user.profile.lastname

		Meteor.call 'sendMail',
			recipient: user.profile.email
			sender: project.name
			from: project.email
			subject: TAPi18n.__('mail.joinProject.subject', '', user.profile.language)
			template: 'confirmation'
			language: user.profile.language
			data:
				project: project.name
				name: name
				content: getMailTexts 'joinProject', user.profile.language
		, (err, res) -> if err
			console.log 'sendMail failed: ' + err
