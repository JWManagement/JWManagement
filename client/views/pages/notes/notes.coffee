Template.notes.helpers

	isReady: -> ProjectSubs.ready()

	getProject: -> Projects.findOne FlowRouter.getParam('projectId')

Template.notes.onCreated ->

	ProjectSubs.subscribe 'notes', FlowRouter.getParam('projectId')

Template.notes.onRendered ->

	$('.animated').removeClass('animated').addClass('skipped')

Template.notes.onDestroyed ->

	$('#addNoteModal').modal('hide')

Template.notes.events

	'click #createNote': ->
		wrs -> FlowRouter.setQueryParams addNote: true

	'click .deleteNote': ->
		projectId = FlowRouter.getParam('projectId')
		noteId = @_id

		swalYesNo
			swal: 'delete.note'
			doConfirm: -> Meteor.call 'deleteNote', projectId, noteId
