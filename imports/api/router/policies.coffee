import { Helpers } from './helpers.coffee'
import { wrs } from '/imports/util/delay.coffee'

FlowRouter.route '/:language/about',
	name: 'about'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		BlazeLayout.render 'blankLayout', content: 'about'

FlowRouter.route '/:language/privacy',
	name: 'privacy'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		BlazeLayout.render 'blankLayout', content: 'privacy'

FlowRouter.route '/:language/terms',
	name: 'terms'
	triggersEnter: [ Helpers.checkLanguage ]
	action: ->
		BlazeLayout.render 'blankLayout', content: 'terms'
