import './project.tpl.jade'
import './project.scss'

import '/imports/ui/components/understaffedShiftsList/understaffedShiftsList.coffee'

Template.project.helpers

	getProject: -> Template.currentData().project

	centerProject: -> 'col-lg-offset-3' if Projects.find({}, fields: _id: 1).count() == 1

	multipleTags: -> @tags.length > 1 if @tags

	getAllTagsPath: (tags) ->
		tags = tags.map (tag) -> tag._id

		FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tags.join('_')

	getTagPath: (tagId) -> FlowRouter.path 'shifts', { projectId: @_id, language: TAPi18n.getLanguage() }, showTags: tagId

	newsThere: -> @news?.text && @news.text != ''

	understaffedShifts: -> Template.currentData().understaffedShifts

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
					showTags: @tags[0]._id
			else
				swal TAPi18n.__('swal.missingTag'), '', 'error'

	'click .shift-link': (e) ->
		e.preventDefault()

		FlowRouter.go 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showTags: @tagId
			showShift: @_id

	'click #editNews': (e) ->
		$('#'+@_id).find('.news-content').addClass('hidden')
		$('#'+@_id).find('.news-editor').removeClass('hidden')
		$('#'+@_id).find('.chars-left').html(140 - $('#'+@_id).find('#news-textarea').val().length + "/140")

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
		$('#'+@_id).find('.chars-left').html(140 - $('#'+@_id).find('#news-textarea').val().length + "/140")
