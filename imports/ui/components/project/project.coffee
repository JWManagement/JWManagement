import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'

import '/imports/ui/components/understaffedShiftsList/understaffedShiftsList.coffee'

import './project.tpl.jade'
import './project.scss'

newsMaxSize = 500

Template.project.helpers

	getProject: -> Template.currentData().project

	getName: (route) -> TAPi18n.__('navigation.' + route)

	centerProject: -> 'col-lg-offset-3' if Projects.find({}, fields: _id: 1).count() == 1

	multipleTags: -> @tags.length > 1 if @tags

	getAllTagsPath: (tags) ->
		tags = tags.map (tag) -> tag._id
		tags = tags.filter (t) -> Roles.userIsInRole Meteor.userId(), Permissions.participant, t._id

		FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tags

	getTagPath: (tagId) -> FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: [tagId]

	newsThere: -> @news?.text && @news.text != ''

	understaffedShifts: -> Template.currentData().understaffedShifts

	dependenciesMatched: (dependency) ->
		if dependency
			projectId = FlowRouter.getParam('projectId')
			project = Projects.findOne(projectId)

			project? && project[dependency] == true
		else
			true

	buttons: -> [
		route: 'settings'
		icon: 'cogs'
		role: 'admin,shiftAdmin'
	,
		route: 'users'
		icon: 'users'
		role: 'admin'
	,
		route: 'reports'
		icon: 'comments'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	,
		route: 'store'
		icon: 'cubes'
		role: 'admin,storeAdmin'
	,
		route: 'vessels'
		icon: 'ship'
		role: 'support'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin,member'
		dependency: 'vesselModule'
	,
		route: 'notes'
		icon: 'pencil'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	,
		route: 'donate'
		icon: 'heart'
		role: 'admin,shiftScheduler,shiftAdmin,storeAdmin'
	]

Template.project.events

	'click #toShifts': (e) ->
		e.preventDefault()

		if $(e.target).closest('.project-wrapper').find('.tags-popup').length
			$(e.target).closest('.project-wrapper').addClass('show-tags-popup')

			$('.tags-popup').on 'click', (e) ->
				$(e.target).closest('.project-wrapper').removeClass('show-tags-popup')
		else
			if @tags.length > 0
				FlowRouter.go 'shifts',
					projectId: @_id
					language: TAPi18n.getLanguage()
				,
					showTags: [@tags[0]._id]
			else
				swal TAPi18n.__('swal.missingTag'), '', 'error'

	'click #toAdmin': (e) ->
		e.preventDefault()

		$(e.target).closest('.project-wrapper').addClass('show-admin-popup')

		$('.admin-popup').on 'click', (e) ->
			$(e.target).closest('.project-wrapper').removeClass('show-admin-popup')

	'click .shift-link': (e) ->
		e.preventDefault()

		FlowRouter.go 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showTags: [@tagId]
			showShift: @_id

	'click #editNews': (e) ->
		$('#'+@_id).find('.news-content').addClass('hidden')
		$('#'+@_id).find('.news-editor').removeClass('hidden')
		$('#'+@_id).find('.chars-left').html(newsMaxSize - $('#'+@_id).find('#news-textarea').val().length + '/' + newsMaxSize)

	'click #cancelNews': (e) ->
		$('#'+@_id).find('.news-editor').addClass('hidden')
		$('#'+@_id).find('.news-content').removeClass('hidden')

	'click #changeNews': (e) ->
		projectId = @_id
		content = $('#'+@_id).find('#news-textarea').val().replace(/(?:\r\n|\r|\n)/g, '<br />')

		Meteor.call 'updateProject', @_id, 'news.date', moment().format()
		Meteor.call 'updateProject', @_id, 'news.text', content, ->
			$('#'+projectId).find('.news-editor').addClass('hidden')
			$('#'+projectId).find('.news-content').removeClass('hidden')

	'keyup #news-textarea': (e) ->
		$('#'+@_id).find('.chars-left').html(newsMaxSize - $('#'+@_id).find('#news-textarea').val().length + '/' + newsMaxSize)
