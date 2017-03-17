import { Delay } from '/imports/util/delay.coffee'
import { wrs } from '/imports/util/delay.coffee'

import './modal.tpl.jade'

R = {}

Template.modal.helpers

	getTemplate: -> R.template if FlowRouter.getQueryParam R.template

Template.modal.onCreated ->

	R.template = Template.currentData().template

	require './editProfilePicture/editProfilePicture.coffee' if R.template == 'editProfilePicture'

Template.modal.onRendered ->

	setQueryParams = {}
	setQueryParams[R.template] = undefined

	@autorun -> if FlowRouter.getQueryParam R.template
		Tracker.afterFlush ->
			$('#' + R.template).modal('show')
			$('#' + R.template).on 'hidden.bs.modal', -> wrs ->
				FlowRouter.setQueryParams setQueryParams
