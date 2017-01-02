Meteor.methods

	sendInvitationMails: (userIds, projectId) ->
		project = Projects.findOne projectId, fields: name: 1, email:1

		check userIds, Array
		check { userId: Meteor.userId(), projectId: projectId }, isAdmin

		for userId in userIds
			token = Random.id 43
			altered = Meteor.users.update userId, $set: 'services.password.reset': 'token': token
			user = Meteor.users.findOne userId, fields:
				'profile.email': 1
				'profile.firstname': 1
				'profile.lastname': 1
				'profile.language': 1

			if altered > 0
				Meteor.call 'sendMail',
					recipient: user.profile.email
					sender: project.name
					from: project.email
					subject: TAPi18n.__('mail.accountCreated.subject', '', user.profile.language)
					template: 'accountCreated'
					language: user.profile.language
					data:
						token: token
						project: project.name
						name: user.profile.firstname + ' ' + user.profile.lastname
						language: user.profile.language
						content: getMailTexts 'accountCreated', user.profile.language
				, (err, res) ->
					if err
						console.log 'sendMail failed: ' + err
					else
						Meteor.call 'setState', projectId, userId, 'invited'
