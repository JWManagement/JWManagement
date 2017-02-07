export SendMail =

	if Meteor.isClient
		send: ->
		sendCancelTeam: ->
		sendConfirmation: ->
		sendConfirmWeek: ->
		sendDeclined: ->
		sendInvitationMails: ->
		sendJoinProject: ->
		sendMessage: ->
		sendResetPassword: ->
		sendReversal: ->
		sendTeamUpdate: ->
		sendToOrga: ->
		sendUnderstaffed: ->
	else if Meteor.isServer
		require('./sendMail.coffee').SendMail
