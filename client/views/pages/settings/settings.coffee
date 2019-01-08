import i18next from 'i18next'
import moment from 'moment'

Template.settings.helpers

	isSupport: -> Roles.userIsInRole Meteor.userId(), 'support', Roles.GLOBAL_GROUP

	getVesselModule: ->
		if this.vesselModule
			'True'
		else
			'False'

	getProject: -> Projects.findOne FlowRouter.getParam('projectId'), fields: infos: 0, items: 0

	teamPicture: -> Pictures.findOne projectId: FlowRouter.getParam('projectId'), teamId: @_id

	meetingPicture: -> Pictures.findOne projectId: FlowRouter.getParam('projectId'), meetingId: @_id

	getLanguage: (language) ->
		i18next.t('language.' + language)

	getLanguages: ->
		[
			{ _id: 'de', name: "Deutsch", en: "German" }
			{ _id: 'en', name: "English", en: "English" }
			{ _id: 'en-AU', name: "English (Australia)", en: "English (Australia)" }
			{ _id: 'fi', name: "Suomi", en: "Finnish" }
			{ _id: 'fr', name: "Français", en: "French (France)" }
			{ _id: 'hu', name: "Magyar", en: "Hungarian" }
			{ _id: 'it', name: "Italiano", en: "Italian" }
			{ _id: 'pl', name: "Polski", en: "Polish" }
			{ _id: 'pt', name: "Português", en: "Portuguese (Portugal)" }
			{ _id: 'ru', name: "Русский", en: "Russian" }
			{ _id: 'zh-CN', name: "简体中文", en: "Chinese (China)" }
			{ _id: 'zh-TW', name: "繁体中文（台湾）", en: "Chinese (Taiwan)" }
		]

	json2String: (a) -> JSON.stringify(a)

Template.settings.onCreated ->

	@autorun ->
		projectId = FlowRouter.getParam('projectId')

		handle = ProjectSubs.subscribe 'settings', projectId
		handle.ready Tracker.afterFlush ->
			project = Projects.findOne(projectId, fields: teams: 1)
			if project? && project.teams?
				for team in project.teams
					if !team.icon?
						team.icon = 'fa-map-signs'

					$('#iconpicker_' + team._id).iconpicker
						arrowClass: 'btn-primary'
						arrowPrevIconClass: 'fa fa-chevron-left'
						arrowNextIconClass: 'fa fa-chevron-right'
						rows: 5
						cols: 10
						footer: true
						header: true
						icon: team.icon
						iconset: 'fontawesome'
						labelHeader: '{0} / {1}'
						labelFooter: '{0} - {1} of {2} icons'
						placement: 'bottom'
						search: true
						searchText: 'Search'
						selectedClass: 'btn-primary'

Template.settings.onRendered ->

	$('.animated').removeClass('animated').addClass('skipped')

Template.settings.onDestroyed ->

	$('#editMeetingPictureModal').modal('hide')
	$('#editTeamPictureModal').modal('hide')

Template.settings.events

	'change #projectName': (e) -> Meteor.call 'updateProject', @_id, 'name', e.target.value, handleError

	'change #news-textarea': (e) ->
		newsValue = e.target.value.replace(/\r\n|\n|\r/g, '<br>')
		if newsValue.charAt(0) == ' '
			newsValue = newsValue.slice(1)
		Meteor.call 'updateProject', @_id, 'news.text', newsValue, handleError
		Meteor.call 'updateProject', @_id, 'news.date', moment().format()

	'change #projectEmail': (e) -> Meteor.call 'updateProject', @_id, 'email', e.target.value, handleError

	'click .changeLanguage': (e) -> Meteor.call 'updateProject', FlowRouter.getParam('projectId'), 'language', $(e.target).attr('newLang'), handleError

	'click .changeVesselModule': (e) -> Meteor.call 'updateProject', FlowRouter.getParam('projectId'), 'vesselModule', ($(e.target).attr('value') == 'true'), handleError

	'change #country': (e) -> Meteor.call 'updateProject', @_id, 'country', e.target.value, handleError

	'change #harbors': (e) -> Meteor.call 'updateProject', @_id, 'harbors', JSON.parse(e.target.value), handleError

	'click #deleteProject': ->
		swalInput
			swal: 'delete.project'
			checkInput: i18next.t('swal.delete.project.checkInput')
			closeOnSuccess: false
			doConfirm: ->
				Meteor.call 'deleteProject', FlowRouter.getParam('projectId'), (e) ->
					if e
						handleError(e)
					else
						swalClose()
						FlowRouter.go(FlowRouter.path('dashboard.details'))

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

		FlowRouter.go 'shifts',
			projectId: projectId
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
			checkInput: i18next.t('swal.delete.tag.checkInput')
			doConfirm: (inputValue) -> Meteor.call 'removeProjectItem', projectId, 'tags', tagId, handleError

	# Teams

	'change #teamName': (e) ->
		teamId = @_id
		teamName = e.target.value
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftTeams', projectId, teamId, 'name', teamName, handleError

	'change .teamIcon': (e) ->
		teamId = @_id
		projectId = FlowRouter.getParam('projectId')

		Meteor.call 'changeAllShiftTeams', projectId, teamId, 'icon', e.icon, handleError

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
			checkInput: i18next.t('swal.delete.team.checkInput')
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
			checkInput: i18next.t('swal.delete.meeting.checkInput')
			doConfirm: (inputValue) -> Meteor.call 'removeProjectItem', projectId, 'meetings', meetingId, handleError
