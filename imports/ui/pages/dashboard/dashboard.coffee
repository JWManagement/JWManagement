import { Projects } from '/imports/api/projects/projects.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'

import '/imports/ui/components/project/project.coffee'
import '/imports/ui/components/projectFake/projectFake.coffee'
import '/imports/ui/components/request/request.coffee'

import './dashboard.tpl.jade'
import './dashboard.scss'

R = {}

Template.dashboard.helpers

	loading: -> !R.handle.ready()

	getUnderstaffedShifts: ->
		Shifts.find
			projectId: @_id
			teams:
				$elemMatch:
					participants: $eq: []
					pending: $gt: []
					status: 'open'
					min: $gt: 1
		.fetch()

	getShifts: ->
		thisDate = parseInt moment().format 'YYYYDDDD'
		thisTime = parseInt moment().format 'Hmm'

		Shifts.find
			$or: [
				$or: [
					date: $lt: thisDate
				,
					date: $eq: thisDate
					end: $lte: thisTime
				]
				'teams.participants._id': Meteor.userId()
			,
				$and: [
					$or: [
						date: $gt: thisDate
					,
						date: $eq: thisDate
						end: $gt: thisTime
					]
				,
					$or: [
						'teams.participants._id': Meteor.userId()
					,
						'teams.pending._id': Meteor.userId()
					]
				]
			],
				fields:
					date: 1
					start: 1
					end: 1
					projectId: 1
					tagId: 1
					tag: 1
					teams: 1
				sort:
					date: 1
					start: 1

	getProjects: ->
		projects = Projects.find {}, sort: name: 1
		result = []

		for project, index in projects.fetch()
			if index % 2 == 0
				result.push projects: [ project ]
			else
				result[result.length - 1].projects.push project
		result

	getFakeProjects: ->
		me = Meteor.user()
		projects = []

		if me? && me.roles?
			for group in Object.keys me.roles
				for role in Permissions.member when role in me.roles[group]
					projects.push group

					if projects.length == 6
						return projects
					break
		projects

	centerFakeProject: ->
		me = Meteor.user()
		count = 0

		if me? && me.roles?
			for group in Object.keys me.roles
				for role in Permissions.member
					if role in me.roles[group]
						if count == 1 then return '' else count = 1
						break
		'col-lg-offset-3'

	hasProjects: -> Projects.find({}, fields: _id: 1).count() > 0

	showOlder: -> Session.get 'showOlder'

	getIcon: (icon) ->
		if icon? then icon
		else 'map-signs'

Template.dashboard.onCreated ->

	R.handle = Meteor.subscribe 'dashboard'

Template.dashboard.onDestroyed ->

	$('#shiftReport').modal('hide')

Template.dashboard.events

	'click #showOlder': -> Session.set 'showOlder', true
