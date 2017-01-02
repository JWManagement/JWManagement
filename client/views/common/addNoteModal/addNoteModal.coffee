Template.addNoteModal.helpers

	getProject: -> Projects.findOne FlowRouter.getParam('projectId'), fields: notes: 1

	getProjectId: -> FlowRouter.getParam('projectId')

Template.addNoteModal.onCreated ->

	projectId = FlowRouter.getParam('projectId')

	@autorun ->
		handle = ProjectSubs.subscribe 'notes', projectId
		handle.ready Tracker.afterFlush ->
			$('#addNoteModal').modal('show')
			$('#addNoteModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams addNote: undefined

Template.addNoteModal.events

	'click #addNote': (e) ->
		e.preventDefault()

		projectId = FlowRouter.getParam('projectId')
		title = $('#title').val().trim()
		text = $('#text').val().trim()

		if title? && title != '' && text? && text != ''
			Meteor.call 'addNote', projectId, title, text, (e) -> if !e
				$('#addNoteModal').modal('hide')
		else
			swal 'Bitte alle Felder ausfüllen', '', 'error'
