import { Helpers } from './helpers.coffee'

FlowRouter.route '/:language/:projectId/dashboard',
	name: 'dashboard'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'dashboard'

FlowRouter.route '/:language/:projectId/kb',
	name: 'wiki'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'wiki'

FlowRouter.route '/:language/:projectId/shifts',
	name: 'shifts'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		unless Session.get('parent') in ['settings', 'home']
			Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'shifts'

FlowRouter.route '/:language/:projectId/admin',
	name: 'admin'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'invertedLayout', content: 'admin'

FlowRouter.route '/:language/:projectId/settings',
	name: 'settings'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'settings'

FlowRouter.route '/:language/:projectId/users',
	name: 'users'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'users'

FlowRouter.route '/:language/:projectId/reports',
	name: 'reports'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'reports'

FlowRouter.route '/:language/:projectId/store',
	name: 'store'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'store'

FlowRouter.route '/:language/:projectId/notes',
	name: 'notes'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'notes'
