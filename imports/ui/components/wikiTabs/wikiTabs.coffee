import { Projects } from '/imports/api/projects/projects.coffee'
import { FR } from '/imports/util/flowrouter.coffee'

import './wikiTabs.tpl.jade'

R = {}

Template.wikiTabs.helpers

	tabs: ->
		project = Projects.findOne FR.getProjectId()
		project?.wiki?.tabs

	ready: -> R.handle?.ready()

Template.wikiTabs.onCreated ->

	projectId = FR.getProjectId()

	@autorun ->
		R.handle = Meteor.subscribe 'wiki', projectId
		R.handle.ready Tracker.afterFlush ->
			$('.nav-tabs > li:first').addClass('active')
			$('.tab-content .tab-pane:first').addClass('active')

Template.wikiTabs.events
