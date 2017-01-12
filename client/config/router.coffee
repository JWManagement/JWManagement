checkLanguage = (c) ->
	if c.params.language? && c.params.language in Object.keys(TAPi18n.getLanguages())
		TAPi18n.setLanguage(c.params.language)
		moment.locale(c.params.language)

		if Meteor.user()
			Delay -> Meteor.call 'updateProfile', 'language', c.params.language
		c.params.language
	else if navigator.language.indexOf('de') > -1
		wrs -> FlowRouter.setParams language: 'de'
		'de'
	else
		wrs -> FlowRouter.setParams language: 'en'
		'en'

logout = -> if Meteor.loggingIn() || Meteor.userId() then Delay -> Meteor.logout()

doIfLoggedIn = (whatToDo, elseToDo) ->
	route = FlowRouter.getRouteName()

	Tracker.autorun (tracker) ->
		if route != FlowRouter.getRouteName()
			tracker.stop()
		else if Meteor.userId()
			whatToDo()
		else if elseToDo?
			elseToDo()
		else
			BlazeLayout.render 'blankLayout', content: 'login'

FlowRouter.notFound = action: -> BlazeLayout.render 'blankLayout', content: 'notFound'

FlowRouter.route '/support',
	name: 'support'
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'support'

################################################################################
###                              Main Routes
################################################################################

FlowRouter.route '/:language?',
	name: 'home'
	triggersEnter: [ checkLanguage ]
	action: ->
		doIfLoggedIn ->
			Session.set 'parent', ''
			BlazeLayout.render 'mainLayout', content: 'dashboard'
		, ->
			FlowRouter.go 'welcome', language: FlowRouter.getParam('language')

FlowRouter.route '/:language/welcome',
	name: 'welcome'
	triggersEnter: [ checkLanguage ]
	action: ->
		BlazeLayout.render 'blankLayout', content: 'landing'

FlowRouter.route '/:language/login',
	name: 'login'
	triggersEnter: [ checkLanguage ]
	action: -> Tracker.autorun (tracker) ->
		if Meteor.userId()
			wrs -> FlowRouter.go 'home', language: FlowRouter.getParam('language')
			tracker.stop()
		else
			BlazeLayout.render 'blankLayout', content: 'login'

FlowRouter.route '/:language/forgot',
	name: 'forgotPassword'
	triggersEnter: [ checkLanguage, logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'forgotPassword'

FlowRouter.route '/:language/reset',
	name: 'resetPassword'
	triggersEnter: [ checkLanguage, logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'resetPassword'

FlowRouter.route '/:language/firstLogin',
	name: 'firstLogin'
	triggersEnter: [ checkLanguage, logout ]
	action: ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'blankLayout', content: 'firstLogin'

FlowRouter.route '/:language/profile',
	name: 'profile'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'profile'

################################################################################
###                           Project Routes
################################################################################

FlowRouter.route '/:language/:projectId/kb',
	name: 'wiki'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'wiki'

FlowRouter.route '/:language/:projectId/shifts',
	name: 'shifts'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		unless Session.get('parent') in ['settings', 'home']
			Session.set 'parent', 'home'
		BlazeLayout.render 'mainLayout', content: 'shifts'

FlowRouter.route '/:language/:projectId/admin',
	name: 'admin'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'home'
		BlazeLayout.render 'invertedLayout', content: 'admin'

FlowRouter.route '/:language/:projectId/settings',
	name: 'settings'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'settings'

FlowRouter.route '/:language/:projectId/users',
	name: 'users'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'users'

FlowRouter.route '/:language/:projectId/reports',
	name: 'reports'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'reports'

FlowRouter.route '/:language/:projectId/store',
	name: 'store'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'store'

FlowRouter.route '/:language/:projectId/notes',
	name: 'notes'
	triggersEnter: [ checkLanguage ]
	action: -> doIfLoggedIn ->
		Session.set 'parent', 'admin'
		BlazeLayout.render 'mainLayout', content: 'notes'

################################################################################
###                           Policies
################################################################################

FlowRouter.route '/:language/about',
	name: 'about'
	triggersEnter: -> wrs ->
		TAPi18n.setLanguage 'de'
		FlowRouter.setParams language: 'de'
	action: ->
		BlazeLayout.render 'blankLayout', content: 'about'

FlowRouter.route '/:language/privacy',
	name: 'privacy'
	triggersEnter: -> wrs ->
		TAPi18n.setLanguage 'de'
		FlowRouter.setParams language: 'de'
	action: ->
		BlazeLayout.render 'blankLayout', content: 'privacy'

FlowRouter.route '/:language/terms',
	name: 'terms'
	triggersEnter: -> wrs ->
		TAPi18n.setLanguage 'de'
		FlowRouter.setParams language: 'de'
	action: ->
		BlazeLayout.render 'blankLayout', content: 'terms'
