import { FR } from '/imports/util/flowrouter.coffee'

import './navigation.tpl.jade'
import './navigation.scss'

Template.navigation.helpers

	name: -> TAPi18n.__('navigation.' + FlowRouter.getRouteName())

	target: ->
		if Session.get('parent')
			if Session.get('target')
				Session.get('target')
			else if Session.get('parent') == 'settings' && FR.getProjectId()
				FlowRouter.path 'settings',
					projectId: FR.getProjectId()
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'admin' && FR.getProjectId()
				FlowRouter.path 'admin',
					projectId: FR.getProjectId()
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'home'
				FlowRouter.path 'home', language: TAPi18n.getLanguage()

Template.navigation.onDestroyed ->

	Session.set 'target', undefined

Template.navigation.events

	'click .back-button': -> FlowRouter.go 'projects', language: FR.getLanguage()
