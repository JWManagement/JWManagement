import './createProjectModal.tpl.jade'

Template.createProjectModal.onRendered ->

	$('#createProjectModal').modal('show')
	$('#createProjectModal').on 'hidden.bs.modal', ->
		wrs -> FlowRouter.setQueryParams
			createProject: undefined
			projectName: undefined
			email: undefined
			name: undefined

	while true
		projectId = teamId = tagId = ''
		possible = 'abcdefghijklmnopqrstuvwxyz'
		for [1 .. 5]
			projectId += possible.charAt(Math.floor(Math.random() * possible.length))
			teamId += possible.charAt(Math.floor(Math.random() * possible.length))
			tagId += possible.charAt(Math.floor(Math.random() * possible.length))
		break unless Projects.findOne(projectId)?

	splittedName = FlowRouter.getQueryParam('name').split(' ')

	$('#projectId').val(projectId)
	$('#projectName').val(FlowRouter.getQueryParam('projectName'))
	$('#email').val(FlowRouter.getQueryParam('email'))
	$('#firstName').val(splittedName[0])

	splittedName[0] = ''
	$('#lastName').val(splittedName.join(' ').substring(1))
	$('#tagId').val(tagId)
	$('#teamId').val(teamId)

Template.createProjectModal.events

	'click #createProject': (e) ->
		e.preventDefault()

		projectId = $('#projectId').val().trim()
		projectName = $('#projectName').val().trim()
		email = $('#email').val().trim()
		language = $('#language').val().trim()
		firstName = $('#firstName').val().trim()
		lastName = $('#lastName').val().trim()
		tagId = $('#tagId').val().trim()
		tagName = $('#tagName').val().trim()
		teamId = $('#teamId').val().trim()
		teamName = $('#teamName').val().trim()

		$('#createProjectModal').modal('hide')

		$('#projectTable').find('.footable-filtering').find('input').val(projectName)
		$('#projectTable').find('.footable-filtering').find('button.btn-primary').click()

		if projectId? && projectId != '' && projectName? && projectName != ''&& email? && email != ''
			Meteor.call 'createProject',
				projectId: projectId
				projectName: projectName
				email: email
				language: language
				firstName: firstName
				lastName: lastName
				tagId: tagId
				tagName: tagName
				teamId: teamId
				teamName: teamName
			, (e) ->
				if e
					handleError e
				else
					Tracker.afterFlush ->
						$('#projectString').val projectId
						$('#projectString').keyup()
		else
			swal 'Please fill out all the fields', '', 'error'

	'change #language': (e) ->
		if e.target.value == 'de'
			$('#tagName').val('Trolley')
			$('#teamName').val('Standort/Route 1')
		else
			$('#tagName').val('Public Witnessing')
			$('#teamName').val('Location/Route 1')
