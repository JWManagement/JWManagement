import './createProjectModal.tpl.jade'

Template.createProjectModal.onRendered ->

	$('#createProjectModal').modal('show')
	$('#createProjectModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams
			createProject: undefined
			projectName: undefined
			email: undefined

	while true
		projectId = ''
		possible = 'abcdefghijklmnopqrstuvwxyz'
		for [1 .. 5]
			projectId += possible.charAt(Math.floor(Math.random() * possible.length))
		break unless Projects.findOne(projectId)?

	$('#projectId').val(projectId)
	$('#projectName').val(FlowRouter.getQueryParam('projectName'))
	$('#email').val(FlowRouter.getQueryParam('email'))

Template.createProjectModal.events

	'click #createProject': (e) ->
		e.preventDefault()

		projectId = $('#projectId').val().trim()
		projectName = $('#projectName').val().trim()
		email = $('#email').val().trim()
		language = $('#language').val().trim()

		$('#createProjectModal').modal('hide')

		$('#projectTable').find('.footable-filtering').find('input').val(projectName)
		$('#projectTable').find('.footable-filtering').find('button.btn-primary').click()

		if projectId? && projectId != '' && projectName? && projectName != ''&& email? && email != ''
			Meteor.call 'createProject',
				projectId: projectId
				projectName: projectName
				email: email
				language: language
			, (e) -> if e then handleError e
		else
			swal 'Please fill out all the fields', '', 'error'
