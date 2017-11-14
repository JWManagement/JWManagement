import { Helpers } from './routeHelpers.coffee'

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

FlowRouter.route '/:language/:projectId/vessels',
	name: 'vessels'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		if Roles.userIsInRole Meteor.userId(), Permissions.storeAdmin, FlowRouter.getParam('projectId')
			Session.set 'parent', 'admin' # TODO: simplify
		else
			Session.set 'parent', 'home' # TODO: simplify

		require('/imports/ui/vessels/vessel.search.js')
		BlazeLayout.render 'vessel.search'

FlowRouter.route '/:language/:projectId/vessels/:itemId',
	name: 'vessel'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'vessel.search' # TODO: simplify

		require('/imports/ui/vessels/vessel.details.js')
		BlazeLayout.render 'vessel.details'

FlowRouter.route '/:language/:projectId/vessels/:itemId/:key',
	name: 'vessel.update'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'vessel' # TODO: simplify

		require('/imports/ui/vessels/vessel.update.js')
		BlazeLayout.render 'vessel.update'
