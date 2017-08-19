import { wrs } from '/imports/api/util/delay.coffee'

import './languageSwitch.tpl.jade'

Template.languageSwitch.events

	'click .setLang': (e) ->
		wrs -> FlowRouter.setParams language: $(e.target).attr('lang')
