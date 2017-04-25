import { Projects } from '/imports/api/projects/projects.coffee'
import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { Delay } from '/imports/api/util/delay.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import './settingsTags.tpl.jade'

Template.settingsTags.helpers

	data: -> Template.currentData().data

Template.settingsTags.onRendered ->

Template.settingsTags.events
	'change #tagName': (e) ->
		tagId = @_id
		tagName = e.target.value
		projectId = FR.getProjectId()

		Projects.methods.tags.changeNameAnywhere.call
			projectId: projectId
			tagId: tagId
			tagName: tagName
		, Dialogs.handleSuccess

	'click .changeImg': (e) ->
		projectId = FlowRouter.getParam('projectId')
		tagId = @_id
		value = $(e.target).closest('a').attr('img')

		if value == 'none'
			Projects.methods.main.updateArray.call
				projectId: projectId,
				array: 'tags'
				arrayId: tagId
				field: 'img'
				value: null
			, Dialogs.handleSuccess
		else
			Projects.methods.main.updateArray.call
				projectId: projectId,
				array: 'tags'
				arrayId: tagId
				field: 'img'
				value: value
			, Dialogs.handleSuccess

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

		Dialogs.swalInput
			swal: 'add.tag'
			doConfirm: (inputValue) ->
				Projects.methods.main.addToArray.call
					projectId: projectId
					array: 'tags'
					name: inputValue
				, Dialogs.handleSuccess

	'click #removeTag': ->
		projectId = FlowRouter.getParam('projectId')
		tagId = @_id

		swalInput
			swal: 'delete.tag'
			checkInput: TAPi18n.__('swal.delete.tag.checkInput')
			doConfirm: (inputValue) -> Meteor.call 'removeProjectItem', projectId, 'tags', tagId, Dialogs.handleError
