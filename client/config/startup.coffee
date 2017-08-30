Meteor.startup ->

	{ TimeSync } = require 'meteor/mizzao:timesync'

	TimeSync.loggingEnabled = false

	BlazeLayout.setRoot('body')

	Tracker.autorun ->
		title = TAPi18n.__('navigation.' + FlowRouter.getRouteName())

		if FlowRouter.getRouteName() == 'home' && !Meteor.user()
			title = TAPi18n.__('navigation.login')

		document.title = title + ' | JW Management'
