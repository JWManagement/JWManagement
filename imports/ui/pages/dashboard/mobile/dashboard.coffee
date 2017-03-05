import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/util/permissions.coffee'

import './dashboard.tpl.jade'
import './dashboard.scss'

Template.dashboard.helpers


	getProjects: -> Projects.find({}, fields: { name: 1 }, sort: { name: 1 }).fetch()

	hasProjects: -> Projects.find({}, fields: _id: 1).count() > 0

Template.dashboard.onCreated ->

	Meteor.subscribe 'dashboard.projects'
