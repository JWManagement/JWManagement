Template.mergeAccountsModal.helpers

Template.mergeAccountsModal.onRendered ->

	$('#mergeAccountsModal').modal('show')
	$('#mergeAccountsModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams mergeAccounts: undefined

Template.mergeAccountsModal.events

	'click #mergeAccounts': (e) ->
		e.preventDefault()

		oldUserId = Meteor.userId()
		username = Validations.cleanedUsername($('#otherUsername').val())
		password = $('#otherPassword').val()

		if username != '' && password != ''
				Meteor.loginWithPassword username, password, (error) ->
					if error
							alert error.reason
					else
						Meteor.loginWithPassword username, password, ->
							$('#mergeAccountsModal').modal('hide')

							Meteor.call 'mergeAccounts', oldUserId, Meteor.userId()

							FlowRouter.go 'home'
		else
			alert 'Please enter username and password'
