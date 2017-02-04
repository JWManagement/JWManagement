#import { Projects } from '/imports/api/projects/projects.coffee'
#import { Shifts } from '/imports/api/shifts/shifts.coffee'

import '/imports/ui/components/project/project.coffee'
import '/imports/ui/components/projectFake/projectFake.coffee'
import '/imports/ui/components/request/request.coffee'

import './dashboard.tpl.jade'
import './dashboard.scss'

Template.dashboard.helpers

	loading: -> !DashboardSubs.ready()

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

	teamRelation: ->
		for user in @participants when Meteor.userId() == user._id
			return 'accepted'

		for user in @pending when Meteor.userId() == user._id
			return 'pending'

	getShifts: ->
		thisDate = parseInt moment(new Date).format 'YYYYDDDD'
		thisTime = parseInt moment(new Date).format 'Hmm'

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

Template.dashboard.onCreated ->

	DashboardSubs.subscribe 'dashboard'

	@autorun -> if DashboardSubs.ready()
		for shift in Shifts.find().fetch()
			ShiftSubs.subscribe 'shift', shift._id

Template.dashboard.onRendered ->

	tour = new Tour
		template: Blaze.toHTML Template.tourTemplate
		steps: [
			orphan: true
			backdrop: true
			title: TAPi18n.__('tour.dashboard.welcome.title')
			content: TAPi18n.__('tour.dashboard.welcome.content')
		,
			element: '.project-wrapper:first > div'
			placement: 'top'
			title: TAPi18n.__('tour.dashboard.projects.title')
			content: TAPi18n.__('tour.dashboard.projects.content')
		,
			element: '.project-wrapper:first .link-wrapper > a:eq(0)'
			placement: 'bottom'
			title: TAPi18n.__('tour.dashboard.wiki.title')
			content: TAPi18n.__('tour.dashboard.wiki.content')
		,
			element: '.project-wrapper:first .link-wrapper > a:eq(1)'
			placement: 'bottom'
			title: TAPi18n.__('tour.dashboard.shifts.title')
			content: TAPi18n.__('tour.dashboard.shifts.content')
		,
			element: '.project-wrapper:first .link-wrapper > a:eq(2)'
			placement: 'bottom'
			title: TAPi18n.__('tour.dashboard.settings.title')
			content: TAPi18n.__('tour.dashboard.settings.content')
		,
			element: '#myShifts'
			placement: 'top'
			title: TAPi18n.__('tour.dashboard.myShifts.title')
			content: TAPi18n.__('tour.dashboard.myShifts.content')
			onShow: (tour) ->
				$('#myShifts').html('<h1 class="center-align" id="myShifts">Meine Schichten</h1>')
				$('#personalShiftsContainer').html(
					'<div class="vertical-container light-timeline center-orientation" id="vertical-timeline">
						<div class="vertical-timeline-block shift accepted"><div class="vertical-timeline-icon"><i class="fa fa-thumbs-o-up"></i></div><a class="vertical-timeline-content" href=""><span class="float-right"></span><h2>Angenommene Bewerbung</h2><span class="vertical-date">in 2 Tagen<br><small>Fr., 1. Januar 2016</small><br><small>10 - 12 Uhr</small></span><div class="shift-participants animated fadeInDown"><div class="inline-block"><b><u>Max Mustermann</u></b><br>John Doe<br>Gustav Gans<br></div></div></a></div>
						<div class="vertical-timeline-block shift pending"><div class="vertical-timeline-icon"><i class="fa fa-question"></i></div><a class="vertical-timeline-content" href=""><span class="float-right"></span><h2>Offene Bewerbung</h2><span class="vertical-date">in 20 Tagen<br><small>Fr., 1. Januar 2016</small><br><small>10 - 12 Uhr</small></span><div class="shift-participants animated fadeInDown"><div class="inline-block"><b><u>Max Mustermann</u></b><br>John Doe<br>Gustav Gans<br></div></div></a></div>
					</div>'
				)
		,
			element: '.accepted > .vertical-timeline-content'
			placement: 'top'
			title: TAPi18n.__('tour.dashboard.myShifts.right.title')
			content: TAPi18n.__('tour.dashboard.myShifts.right.content')
		,
			element: '.pending > .vertical-timeline-content'
			placement: 'top'
			title: TAPi18n.__('tour.dashboard.myShifts.left.title')
			content: TAPi18n.__('tour.dashboard.myShifts.left.content')
			onNext: (tour) ->
				$('#myShifts').html('')
				$('#personalShiftsContainer').html('')

		,
			element: '#profile'
			placement: 'bottom'
			title: TAPi18n.__('tour.dashboard.profile.title')
			content: TAPi18n.__('tour.dashboard.profile.content')
			onShow: (tour) -> FlowRouter.reload()
		,
			orphan: true
			backdrop: true
			title: TAPi18n.__('tour.dashboard.finish.title')
			content: TAPi18n.__('tour.dashboard.finish.content')
		]

	tour.init()
	tour.start()

	Session.set 'showOlder', false

Template.dashboard.onDestroyed ->

	$('#shiftReport').modal('hide')

Template.dashboard.events

	'click #showOlder': -> Session.set 'showOlder', true
