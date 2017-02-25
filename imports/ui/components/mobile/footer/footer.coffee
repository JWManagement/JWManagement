import './footer.tpl.jade'
import './footer.scss'

import '/imports/ui/styles/ionic/import.scss'

Template.footer.helpers

	tabs: -> [
		name: 'My Projects'
		icon: 'home'
	,
		name: 'My Shifts'
		icon: 'calendar-outline'
	,
		name: 'My Profile'
		icon: 'person-outline'
	]
