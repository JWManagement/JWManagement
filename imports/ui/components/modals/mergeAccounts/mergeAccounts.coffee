Template.mergeAccounts.events

	'click #mergeAccounts': (e) ->
		e.preventDefault()

		oldUserId = Meteor.userId()
		username = $('#otherUsername').val().trim()
		password = $('#otherPassword').val()

		if username
			if password
				Meteor.loginWithPassword username, password, (error) ->
					if error
						Meteor.setTimeout ->
							submit.ladda('stop')
							alert error.reason
						, 500
					else
						Meteor.loginWithPassword username, password, ->
							$('#mergeAccountsModal').modal('hide')

							Meteor.call 'mergeAccounts', oldUserId, Meteor.userId()

							FlowRouter.go 'home'
