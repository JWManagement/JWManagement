export Helpers =

	checkLanguage: (c) ->
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

	logout: -> if Meteor.loggingIn() || Meteor.userId() then Delay -> Meteor.logout()

	doIfLoggedIn: (whatToDo, elseToDo) ->
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
