import { wrs } from '/imports/api/util/delay.coffee'

import './modal.tpl.jade'

Template.modal.helpers

	getTemplate: ->
		template = Template.currentData().template
		template if template

Template.modal.onCreated ->

	template = Template.currentData().template

	require './editProfilePicture/editProfilePicture.coffee' if template == 'editProfilePicture'
	require './showShift/showShift.coffee' if template == 'showShift'

Template.modal.onRendered ->

	template = Template.currentData().template
	setQueryParams = {}
	setQueryParams[template] = undefined

	@autorun ->
		if FlowRouter.getQueryParam template
			Tracker.afterFlush ->
				$('#' + template).modal('show')
				$('#' + template).on 'hidden.bs.modal', -> wrs ->
					FlowRouter.setQueryParams setQueryParams
