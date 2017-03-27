import { Projects } from '/imports/api/projects/projects.coffee'
import { Dialogs } from '/imports/util/dialogs.coffee'
import { Delay } from '/imports/util/delay.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import './settingsMain.tpl.jade'

Template.settingsMain.helpers

	data: -> Template.currentData().data

Template.settingsMain.onRendered ->

Template.settingsMain.events

	'change #projectName': (e) ->
		Projects.methods.main.update.call
			projectId: @_id
			field: 'name'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #projectEmail': (e) ->
		Projects.methods.main.update.call
			projectId: @_id
			field: 'email'
			value: e.target.value
		, Dialogs.handleSuccess

	'click .changeLanguage': (e) ->
		Projects.methods.main.update.call
			projectId: @_id
			field: 'language'
			value: $(e.target).attr('newLang')
		, Dialogs.handleSuccess

	'click #deleteProject': (e) ->
		projectId = @_id

		Dialogs.swalInput
			swal: 'delete.project'
			checkInput: TAPi18n.__('swal.delete.project.checkInput')
			closeOnSuccess: false
			doConfirm: ->
				$('.sweet-alert').html('<h1><i class="fa fa-spinner fa-pulse"></i></h1>')

				Projects.methods.delete.call
					projectId: projectId
				, Dialogs.callback
					onError: Dialogs.handleError
					onSuccess: (e) ->
						Dialogs.swalClose()
						FlowRouter.go 'home', language: FR.getLanguage(), -> Dialogs.handleSuccess e
