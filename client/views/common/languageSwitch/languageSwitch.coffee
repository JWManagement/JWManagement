import { wrs } from '/imports/util/delay.coffee'

Template.languageSwitch.events

	'click .setLang': (e) ->
		wrs -> FlowRouter.setParams language: $(e.target).attr('lang')
