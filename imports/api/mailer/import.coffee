export SendMail =

	if Meteor.isClient
		send: ->
		sendConfirmation: ->
		sendDeclined: ->
		sendConfirmWeek: ->
		sendTeamUpdate: ->
	else if Meteor.isServer
		require('./sendMail.coffee').SendMail
