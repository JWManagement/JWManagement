import { Messages } from '/imports/api/messages/messages.coffee'

Meteor.publish 'support.messages', ->

	if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
		Messages.find
			'recipient.name': 'Support'
			status: 'new'
		, {}
	else
		@ready()
