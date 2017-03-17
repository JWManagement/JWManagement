import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/util/permissions.coffee'

import '/imports/ui/components/spinner/spinner.js'

import './dashboard.tpl.jade'
import './dashboard.scss'

R = {}

Template.dashboard.helpers

	loaded: -> R.handle.ready()

	getProjects: -> Projects.find({}, fields: { name: 1 }, sort: { name: 1 }).fetch()

	hasProjects: -> Projects.find({}, fields: _id: 1).count() > 0

Template.dashboard.onCreated ->

	R.handle = Meteor.subscribe 'projects'
