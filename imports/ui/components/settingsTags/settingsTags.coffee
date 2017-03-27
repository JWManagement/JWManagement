import { Projects } from '/imports/api/projects/projects.coffee'
import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import './settingsTags.tpl.jade'

Template.settingsTags.helpers

	data: -> Template.currentData().data

Template.settingsTags.onRendered ->

Template.settingsTags.events
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
