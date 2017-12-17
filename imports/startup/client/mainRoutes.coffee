import { Helpers } from './routeHelpers.coffee'

FlowRouter.notFound = action: -> BlazeLayout.render 'blankLayout', content: 'notFound'

FlowRouter.route '/support',
	name: 'support'
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'home'

		require('/imports/ui/pages/support/support.coffee')
		BlazeLayout.render 'mainLayout', content: 'support'

## ---------------- ##

FlowRouter.route '/:language?',
	name: 'home'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		Helpers.doIfLoggedIn ->
			Session.set 'parent', ''
			BlazeLayout.render 'mainLayout', content: 'dashboard'
		, ->
			FlowRouter.go 'welcome', language: FlowRouter.getParam('language')

FlowRouter.route '/:language/welcome',
	name: 'welcome'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		BlazeLayout.render 'blankLayout', content: 'landing'

FlowRouter.route '/:language/login',
	name: 'login'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Tracker.autorun (tracker) ->
		if Meteor.userId()
			wrs -> FlowRouter.go 'home', language: FlowRouter.getParam('language')
			tracker.stop()
		else
			BlazeLayout.render 'blankLayout', content: 'login'

FlowRouter.route '/:language/forgot',
	name: 'forgotPassword'
	triggersEnter: [ Helpers.checkLanguage, Helpers.logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'forgotPassword'

FlowRouter.route '/:language/reset',
	name: 'resetPassword'
	triggersEnter: [ Helpers.checkLanguage, Helpers.logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'resetPassword'

FlowRouter.route '/:language/firstLogin',
	name: 'firstLogin'
	triggersEnter: [ Helpers.checkLanguage, Helpers.logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'firstLogin'

FlowRouter.route '/:language/profile',
	name: 'profile'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'profile'

FlowRouter.route '/:language/donate',
	name: 'donate'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'donate'
