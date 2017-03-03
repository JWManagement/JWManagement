import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/util/permissions.coffee'

import './dashboard.tpl.jade'
import './dashboard.scss'

Template.dashboard.helpers

	getProjects: ->
		projects = Projects.find {}, sort: name: 1
		result = []

		for project, index in projects.fetch()
			if index % 2 == 0
				result.push projects: [ project ]
			else
				result[result.length - 1].projects.push project
		result

	hasProjects: -> Projects.find({}, fields: _id: 1).count() > 0

Template.dashboard.onCreated ->

	Meteor.subscribe 'dashboard'
