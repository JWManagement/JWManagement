Template.navbarBrand.helpers

	name: -> TAPi18n.__('navigation.' + FlowRouter.getRouteName())

	target: ->
		if Session.get('parent')
			if Session.get('target')
				Session.get('target')
			else if Session.get('parent') == 'settings' && FlowRouter.getParam('projectId')
				FlowRouter.path 'settings',
					projectId: FlowRouter.getParam('projectId')
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'admin' && FlowRouter.getParam('projectId')
				FlowRouter.path 'admin',
					projectId: FlowRouter.getParam('projectId')
					language: TAPi18n.getLanguage()
			else if Session.get('parent') == 'home'
				FlowRouter.path 'home', language: TAPi18n.getLanguage()

Template.navbarBrand.events

	'click .unimpersonate': -> Impersonate.undo -> wrs -> FlowRouter.go 'support'
