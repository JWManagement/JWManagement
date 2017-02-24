import { wrs } from '/imports/util/delay.coffee'
import { Delay } from '/imports/util/delay.coffee'

export Helpers =

	checkLanguage: (c) ->
		if c.params.language? && c.params.language in Object.keys(TAPi18n.getLanguages())
			TAPi18n.setLanguage(c.params.language)
			moment.locale(c.params.language)

			if Meteor.user()
				Delay -> Meteor.users.methods.profile.update.call
					field: 'language'
					value: c.params.language

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

	# TODO: DELETE SOON
	migrateToken: (c) ->
		if !c.params.token? && c.queryParams.token?
			wrs ->
				FlowRouter.setParams token: c.queryParams.token
				FlowRouter.setQueryParams token: undefined
