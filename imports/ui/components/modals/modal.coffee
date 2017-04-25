import { Delay } from '/imports/api/util/delay.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import './modal.tpl.jade'

R = {}

Template.modal.helpers

	getTemplate: -> R.template if FlowRouter.getQueryParam R.template

Template.modal.onCreated ->

	R.template = Template.currentData().template

	require './editProfilePicture/editProfilePicture.coffee' if R.template == 'editProfilePicture'
	require './showShift/showShift.coffee' if R.template == 'showShift'

Template.modal.onRendered ->

	setQueryParams = {}
	setQueryParams[R.template] = undefined

	@autorun ->
		console.log 'autorun'
		console.log R.template
		if FlowRouter.getQueryParam R.template
			Tracker.afterFlush ->
				console.log 'hello'
				$('#' + R.template).modal('show')
				$('#' + R.template).on 'hidden.bs.modal', -> wrs ->
					FlowRouter.setQueryParams setQueryParams
