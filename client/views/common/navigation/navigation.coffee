import i18next from 'i18next'

Template.navigation.helpers

	name: -> i18next.t('navigation.' + FlowRouter.getRouteName())

	target: ->
		parent = Session.get('parent')

		if parent
			target = Session.get('target')

			if target
				target
			else if parent == 'dashboard.details'
				FlowRouter.path 'dashboard.details',
					language: i18next.language
			else
				projectId = FlowRouter.getParam('projectId')

				if parent != 'home' && projectId
					FlowRouter.path parent,
						projectId: projectId
						language: i18next.language
				else
					FlowRouter.path parent, language: i18next.language

Template.navigation.onDestroyed ->

	Session.set 'target', undefined
