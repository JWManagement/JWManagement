Template.mergeAccounts.events

	'click #mergeAccounts': (e) ->
		e.preventDefault()

		oldUserId = Meteor.userId()
		username = Validations.cleanedUsername($('#otherUsername').val())
		password = $('#otherPassword').val()

		if username != '' && password != ''
			if username != Meteor.user().username
				Meteor.loginWithPassword username, password, (error) ->
					if error
						alert error.reason
					else
						Meteor.loginWithPassword username, password, ->
							$('#mergeAccountsModal').modal('hide')

							Meteor.call 'mergeAccounts', oldUserId, Meteor.userId()

							FlowRouter.go 'home'
			else
				alert 'Please the OTHER account\'s credentials'
		else
			alert 'Please enter username and password'
