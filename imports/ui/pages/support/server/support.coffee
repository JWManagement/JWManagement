import { Messages } from '/imports/api/messages/messages.coffee'

Meteor.publish 'support', ->

	if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
		[
			Messages.find
				'recipient.name': 'Support'
				status: 'new'
			, {}
		,
			Projects.find {},
				fields: name: 1
		]
	else
		@ready()
