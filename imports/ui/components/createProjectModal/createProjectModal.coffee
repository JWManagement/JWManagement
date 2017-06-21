import './createProjectModal.tpl.jade'

Template.createProjectModal.onRendered ->

	$('#createProjectModal').modal('show')
	$('#createProjectModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams createProject: undefined

Template.createProjectModal.events

	'click #createProject': (e) ->
		e.preventDefault()

		projectId = FlowRouter.getParam('projectId')
		title = $('#title').val().trim()
		text = $('#text').val().trim()

		if title? && title != '' && text? && text != ''
			#Meteor.call 'addNote', projectId, title, text, (e) -> if !e
			#	$('#addNoteModal').modal('hide')
		else
			swal 'Bitte alle Felder ausfüllen', '', 'error'
