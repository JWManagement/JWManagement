Template.navigation.helpers

	name: -> TAPi18n.__('navigation.' + FlowRouter.getRouteName())

	target: ->
		parent = Session.get('parent')

		if parent
			target = Session.get('target')

			if target
				target
			else if parent == 'dashboard.details'
				FlowRouter.path 'dashboard.details',
					language: TAPi18n.getLanguage()
			else
				projectId = FlowRouter.getParam('projectId')

				if parent != 'home' && projectId
					FlowRouter.path parent,
						projectId: projectId
						language: TAPi18n.getLanguage()
				else
					FlowRouter.path 'home', language: TAPi18n.getLanguage()

Template.navigation.onDestroyed ->

	Session.set 'target', undefined
