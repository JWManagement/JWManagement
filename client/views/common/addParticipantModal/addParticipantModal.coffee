Template.addParticipantModal.helpers

	getUsers: -> Session.get 'users'

	getAvailableUsers: -> Session.get 'availableUsers'

	selectedClass: -> 'active' if @_id == FlowRouter.getQueryParam('participantId')

Template.addParticipantModal.onRendered ->

	projectId = FlowRouter.getParam('projectId')
	shiftId = FlowRouter.getQueryParam('shiftId')
	teamId = FlowRouter.getQueryParam('teamId')

	@autorun ->
		handle = UserSubs.subscribe 'usersByProject', projectId
		handle.ready Tracker.afterFlush ->
			users = Meteor.users.find().fetch()
			Meteor.call 'removeTeamUsers', users, shiftId, teamId, (err, filteredUsers) ->
				Session.set 'users', filteredUsers

	Meteor.call 'getAvailableUsers', projectId, shiftId, (error, users) ->
		Meteor.call 'removeTeamUsers', users, shiftId, teamId, (err, filteredUsers) ->
			Session.set 'availableUsers', filteredUsers

	$('#addParticipantModal').modal('show')
	$('#addParticipantModal').on 'hidden.bs.modal', ->
		Session.set 'availableUsers', null
		wrs -> FlowRouter.setQueryParams
			addParticipant: null
			shiftId: null
			teamId: null
			participantId: null
			showShift: shiftId

Template.addParticipantModal.events

	'click #setUser': (e) ->
		e.preventDefault()

		if FlowRouter.getQueryParam('participantId') == @_id
			wrs -> FlowRouter.setQueryParams participantId: null
		else
			wrs -> FlowRouter.setQueryParams participantId: @_id

	'change #other-users': (e) ->
		wrs -> FlowRouter.setQueryParams participantId: $(e.target).val()

	'click #submit': ->
		shiftId = FlowRouter.getQueryParam('shiftId')
		teamId = FlowRouter.getQueryParam('teamId')
		participantId = FlowRouter.getQueryParam('participantId')

		Meteor.call 'addParticipant', shiftId, teamId, participantId, handleError
