import { wrs } from '/imports/api/util/delay.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'
import { Platform } from '/imports/api/util/platform.coffee'

import { Helpers } from './helpers.coffee'

FlowRouter.route '/support',
	name: 'support'
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'support'

FlowRouter.route '/:language?',
	name: 'home'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		Helpers.doIfLoggedIn ->
			if Platform.isCordova
				wrs -> FlowRouter.go 'projects', language: FR.getLanguage()
			else
				Session.set 'parent', ''
				BlazeLayout.render 'mainLayout', content: 'dashboard'
		, ->
			FlowRouter.go 'welcome', language: FR.getLanguage()

FlowRouter.route '/:language?/projects',
	name: 'projects'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Helpers.doIfLoggedIn ->
		Session.set 'parent', ''
		BlazeLayout.render 'mainLayout', content: 'projects'

FlowRouter.route '/:language/welcome',
	name: 'welcome'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		BlazeLayout.render 'blankLayout', content: 'welcome'

FlowRouter.route '/:language/login',
	name: 'login'
	triggersEnter: [ Helpers.checkLanguage ]
	action: -> Tracker.autorun (tracker) ->
		if Meteor.userId()
			wrs -> FlowRouter.go 'home', language: FR.getLanguage()
			tracker.stop()
		else
			BlazeLayout.render 'blankLayout', content: 'login'

FlowRouter.route '/:language/forgot',
	name: 'forgotPassword'
	triggersEnter: [ Helpers.checkLanguage, Helpers.logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'forgotPassword'

FlowRouter.route '/:language/reset/:token?',
	name: 'resetPassword'
	triggersEnter: [ Helpers.checkLanguage, Helpers.logout, Helpers.migrateToken ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'resetPassword'

FlowRouter.route '/:language/firstLogin/:token?',
	name: 'firstLogin'
	triggersEnter: [ Helpers.checkLanguage, Helpers.logout, Helpers.migrateToken ]
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
