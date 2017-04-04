import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import '/imports/ui/components/spinner/spinner.js'

import './projects.tpl.jade'
import './projects.scss'

R = {}

Template.projects.helpers

	loaded: -> R.handle.ready()

	getProjects: -> Projects.find({}, fields: { name: 1 }, sort: { name: 1 }).fetch()

	hasProjects: -> Projects.find({}, fields: _id: 1).count() > 0

Template.projects.onCreated ->

	R.handle = Meteor.subscribe 'projects'

Template.projects.events

	'click a.item': -> FlowRouter.go 'dashboard', language: FR.getLanguage(), projectId: @_id
