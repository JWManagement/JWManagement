Template.settings.helpers

	getProject: -> Projects.findOne FlowRouter.getParam('projectId'), fields: infos: 0, items: 0

	teamPicture: -> Pictures.findOne projectId: FlowRouter.getParam('projectId'), teamId: @_id

	meetingPicture: -> Pictures.findOne projectId: FlowRouter.getParam('projectId'), meetingId: @_id

	getLanguages: -> Object.keys(TAPi18n.getLanguages()).map (language) ->
		a = TAPi18n.getLanguages()[language]
		_id: language, name: a.name, en: a.en

Template.settings.onCreated ->

	@autorun ->
		handle = ProjectSubs.subscribe 'settings', FlowRouter.getParam('projectId')
		handle.ready Tracker.afterFlush ->
			$('.iconpicker').iconpicker
				arrowClass: 'btn-primary'
				arrowPrevIconClass: 'fa fa-chevron-left'
				arrowNextIconClass: 'fa fa-chevron-right'
				rows: 5
				cols: 10
				footer: true
				header: true
				icon: 'fa-wifi'
				iconset: 'fontawesome'
				labelHeader: '{0} of {1} pages'
				labelFooter: '{0} - {1} of {2} icons'
				placement: 'bottom'
				search: true
				searchText: 'Search'

Template.settings.onRendered ->

	$('.animated').removeClass('animated').addClass('skipped')

Template.settings.onDestroyed ->

	$('#editMeetingPictureModal').modal('hide')
	$('#editTeamPictureModal').modal('hide')

Template.settings.events

	'change #projectName': (e) -> Meteor.call 'updateProject', @_id, 'name', e.target.value, handleError

	'change #projectEmail': (e) -> Meteor.call 'updateProject', @_id, 'email', e.target.value, handleError

	'click .changeLanguage': (e) -> Meteor.call 'updateProject', FlowRouter.getParam('projectId'), 'language', $(e.target).attr('newLang'), handleError

	'click #deleteProject': ->
		swalInput
			swal: 'delete.project'
			checkInput: TAPi18n.__('swal.delete.project.checkInput')
			closeOnSuccess: false
			doConfirm: ->
				Meteor.call 'deleteProject', FlowRouter.getParam('projectId'), (e) ->
					if e
						swal 'Error ' + e.error, e.reason, 'error'
					else
						swalClose()
						Delay -> FlowRouter.go('home')

	# Tags

	'change #tagName': (e) ->
		tagId = @_id
		tagName = e.target.value
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftTags', projectId, tagId, tagName, handleError

	'click .changeImg': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = @_id
		value = $(e.target).closest('a').attr('img')

		if value == 'none'
			Meteor.call 'updateProjectItem', projectId, 'tags', tagId, 'img', null, handleError
		else
			Meteor.call 'updateProjectItem', projectId, 'tags', tagId, 'img', value, handleError

	'click #showTemplate': (e) ->
		e.preventDefault()

		Session.set('parent', 'settings')
		tagId = $(e.target).closest('.form-group').attr('tagId')
		projectId = FlowRouter.getParam('projectId')
		language = FlowRouter.getParam('language')

		FlowRouter.go 'shifts',
			projectId: projectId
			language: language
		,
			tagId: tagId
			templateId: @_id
			weekId: @weekId

	'click #addTemplate': (e) ->
		tagId = @_id

		swalInput
			swal: 'add.template'
			doConfirm: (inputValue) -> Meteor.call 'addTemplate', FlowRouter.getParam('projectId'), tagId, inputValue

	'click #editTemplate': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = $(e.target).closest('.form-group').attr('tagId')
		templateId = @_id

		swalInput
			swal: 'update.template'
			defaultValue: @name
			doConfirm: (inputValue) -> Meteor.call 'updateTemplate', projectId, tagId, templateId, 'name', inputValue

	'click #removeTemplate': (e) ->
		tagId = $(e.target).closest('.form-group').attr('tagId')
		projectId = FlowRouter.getParam('projectId')
		weekId = @weekId
		templateId = @_id

		swalYesNo
			swal: 'delete.template'
			type: 'warning'
			doConfirm: -> Meteor.call 'removeTemplate', projectId, tagId, templateId, weekId

	'click #addTag': ->
		projectId = FlowRouter.getParam('projectId')

		swalInput
			swal: 'add.tag'
			doConfirm: (inputValue) -> Meteor.call 'addProjectItem', projectId, 'tags', inputValue, handleError

	'click #removeTag': ->
		projectId = FlowRouter.getParam('projectId')
		tagId = @_id

		swalInput
			swal: 'delete.tag'
			checkInput: TAPi18n.__('swal.delete.tag.checkInput')
			doConfirm: (inputValue) -> Meteor.call 'removeProjectItem', projectId, 'tags', tagId, handleError

	# Teams

	'change #teamName': (e) ->
		teamId = @_id
		teamName = e.target.value
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftTeams', projectId, teamId, 'name', teamName, handleError

	'click #editTeamPicture': (e) ->
		teamId = @_id

		wrs -> FlowRouter.setQueryParams editTeamPicture: teamId

	'change #teamLink': (e) ->
		teamId = @_id
		teamLink = e.target.value
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftTeams', projectId, teamId, 'link', teamLink, handleError

	'change #teamDescription': (e) ->
		teamId = @_id
		teamDescription = e.target.value
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftTeams', projectId, teamId, 'description', teamDescription, handleError

	'click #addTeam': ->
		projectId = FlowRouter.getParam('projectId')

		swalInput
			swal: 'add.team'
			doConfirm: (inputValue) -> Meteor.call 'addProjectItem', projectId, 'teams', inputValue, handleError

	'click #removeTeam': ->
		projectId = FlowRouter.getParam('projectId')
		teamId = @_id

		swalInput
			swal: 'delete.team'
			checkInput: TAPi18n.__('swal.delete.team.checkInput')
			doConfirm: (inputValue) -> Meteor.call 'removeProjectItem', projectId, 'teams', teamId, handleError

	# Meetings

	'change #meetingName': (e) ->
		meetingId = @_id
		meetingName = e.target.value
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftMeetings', projectId, meetingId, 'name', meetingName, handleError

	'click #editMeetingPicture': (e) ->
		meetingId = @_id

		wrs -> FlowRouter.setQueryParams editMeetingPicture: meetingId

	'click #addMeeting': ->
		projectId = FlowRouter.getParam('projectId')

		swalInput
			swal: 'add.meeting'
			doConfirm: (inputValue) -> Meteor.call 'addProjectItem', projectId, 'meetings', inputValue, handleError

	'click #removeMeeting': ->
		projectId = FlowRouter.getParam('projectId')
		meetingId = @_id

		swalInput
			swal: 'delete.meeting'
			checkInput: TAPi18n.__('swal.delete.meeting.checkInput')
			doConfirm: (inputValue) -> Meteor.call 'removeProjectItem', projectId, 'meetings', meetingId, handleError
