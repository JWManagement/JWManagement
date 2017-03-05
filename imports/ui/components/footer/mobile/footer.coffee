import './footer.tpl.jade'
import './footer.scss'

import '/imports/ui/styles/ionic/import.scss'

Template.footer.helpers

	tabs: -> [
		name: 'My Projects'
		icon: 'home'
		routes: ['dashboard', 'projects']
	,
		name: 'My Shifts'
		icon: 'calendar'
		routes: []
	,
		name: 'My Profile'
		icon: 'person'
		routes: []
	]

	iconClass: ->
		if FlowRouter.getRouteName() in @routes
			@icon
		else
			@icon + '-outline'

	activeTab: -> 'active' if FlowRouter.getRouteName() in @routes
