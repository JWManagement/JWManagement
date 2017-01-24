@R = {}

Meteor.methods

	schedule: (projectId, date) -> if Meteor.isServer
