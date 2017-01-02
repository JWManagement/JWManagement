Template.inviteUserModal.helpers

	getNewUser: -> Meteor.users.find(state: $in: ['invited', 'created']).fetch()

	isInvited: -> 'text-warning' if @state == 'invited'

Template.inviteUserModal.onRendered ->

	$('#inviteUserModal').modal('show')
	$('#inviteUserModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams inviteUser: undefined

	Session.set 'selectedUsers', []

Template.inviteUserModal.events

	'change #selectAll': (e) ->
		if $(e.target).prop('checked')
			users = Meteor.users.find(state: $in: ['invited', 'created']).fetch()
			selectedUsers = (user._id for user in users)
			Session.set 'selectedUsers', selectedUsers

			$('input[id^="check"]').prop('checked', true)
		else
			Session.set 'selectedUsers', []
			$('input[id^="check"]').prop('checked', false)

	'change input[id^="check"]': (e) ->
		if $(e.target).prop('checked')
			selectedUsers = Session.get('selectedUsers')
			selectedUsers.push(@_id)
			Session.set 'selectedUsers', selectedUsers
		else
			selectedUsers = Session.get 'selectedUsers'
			index = selectedUsers.indexOf(@_id)
			selectedUsers.splice(index, 1)
			Session.set 'selectedUsers', selectedUsers

			$('#selectAll').prop('checked', false)

	'click #inviteUsers': ->
		projectId = FlowRouter.getParam('projectId')
		selectedUsers = Session.get('selectedUsers')

		swalYesNo
			swal: 'invite.users'
			type: 'warning'
			doConfirm: -> Meteor.call 'sendInvitationMails', selectedUsers, projectId
