import { Helpers } from './helpers.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

FlowRouter.route '/:language/:projectId/dashboard',
	name: 'dashboard'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'dashboard'

FlowRouter.route '/:language/:projectId/kb',
	name: 'wiki'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'wiki'

FlowRouter.route '/:language/:projectId/shifts',
	name: 'shifts'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'shifts'

FlowRouter.route '/:language/:projectId/settings',
	name: 'settings'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'adminLayout', content: 'settings'

FlowRouter.route '/:language/:projectId/users',
	name: 'users'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'users'

FlowRouter.route '/:language/:projectId/reports',
	name: 'reports'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'reports'

FlowRouter.route '/:language/:projectId/store',
	name: 'store'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'store'

FlowRouter.route '/:language/:projectId/notes',
	name: 'notes'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn -> Helpers.setParentHome ->
		BlazeLayout.render 'mainLayout', content: 'notes'

FlowRouter.route '/:language/:projectId/vessels',
	name: 'vessels'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		if Roles.userIsInRole Meteor.userId(), Permissions.storeAdmin, FlowRouter.getParam('projectId')
			Session.set 'parent', 'admin'
		else
			Session.set 'parent', 'home'

		BlazeLayout.render 'vessels'

FlowRouter.route '/:language/:projectId/vessels/:itemId',
	name: 'vessel'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'vessels'

		BlazeLayout.render 'vessel'
