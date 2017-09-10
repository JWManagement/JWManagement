import { Projects } from '/imports/api/projects/projects.coffee'
import { Messages } from '/imports/api/messages/messages.coffee'

Meteor.publish 'support', ->

	if Roles.userIsInRole @userId, 'support', Roles.GLOBAL_GROUP
		Messages.find
			'recipient.name': 'Support'
			status: 'new'
		, {}
	else
		@ready()
