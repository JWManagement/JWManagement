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
			_id: @_id
			field: 'name'
			value: e.target.value
		, Dialogs.handleSuccess

	'change #projectEmail': (e) ->
		Projects.methods.main.update.call
			_id: @_id
			field: 'email'
			value: e.target.value
		, Dialogs.handleSuccess

	'click .changeLanguage': (e) ->
		Projects.methods.main.update.call
			_id: @_id
			field: 'language'
			value: $(e.target).attr('newLang')
		, Dialogs.handleSuccess
