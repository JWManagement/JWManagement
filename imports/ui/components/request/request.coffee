import { Projects } from '/imports/api/projects/projects.coffee'
import { wrs } from '/imports/api/util/delay.coffee'

import './request.tpl.jade'
import './request.scss'

Template.request.helpers

	getShift: -> Template.currentData().shift

	showShift: ->
		me = Meteor.user()
		today = parseInt(moment().format('YYYYDDDD'))
		now = parseInt(moment().format('Hmm'))
		missingReport = false
		myShift = false

		for team in @teams
			for user in team.participants when user._id == me._id
				myShift = true

				if user.thisTeamleader
					missingReport = true

					if team.report && team.report.submitted
						missingReport = false

			for user in team.pending when user._id == me._id
				myShift = true

		myShift && (@date > today || @date == today && @end >= now || Session.get('showOlder') || missingReport)

	isRelation: (a) ->
		thisDate = parseInt moment().format 'YYYYDDDD'
		thisTime = parseInt moment().format 'Hmm'
		userId = Meteor.userId()

		if a == 'missing'
			reportSubmitted = false

			for team in @teams
				for user in team.participants when user._id == userId && user.thisTeamleader
					isTeamleader = true
					if team.report && team.report.submitted
						reportSubmitted = team.report.submitted

			(@date < thisDate || @date == thisDate && @end <= thisTime) && !reportSubmitted && isTeamleader
		else if a == 'approved'
			for team in @teams
				for participant in team.participants
					value = value || participant._id == userId
			value
		else if a == 'pending'
			value = false
			for team in @teams
				for pendingUser in team.pending
					value = value || pendingUser._id == userId
			value
		else if a == 'declined'
			false

	pathForShift: ->
		FlowRouter.path 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showWeek: moment(@date, 'YYYYDDDD').format('GGGG[W]WW')
			showTags: [@tagId]
			showShift: @_id

	shiftRelation: ->
		thisDate = parseInt moment().format 'YYYYDDDD'
		thisTime = parseInt moment().format 'Hmm'
		userId = Meteor.userId()

		for team in @teams
			for user in team.participants when user._id == userId && user.thisTeamleader
				isTeamleader = true
				if team.report && team.report.submitted
					reportSubmitted = team.report.submitted

		if (@date < thisDate || @date == thisDate && @end <= thisTime) && !reportSubmitted && isTeamleader
			'missing'
		else
			for team in @teams
				for participant in team.participants
					value = value || participant._id == userId
			if value
				'approved'
			else
				for team in @teams
					for pendingUser in team.pending when pendingUser._id == userId
						return 'pending'
				'declined'

	teamRelation: ->
		userId = Meteor.userId()

		for user in @participants when user._id == userId
			return 'approved'

		for user in @pending when user._id == userId
			return 'pending'

	multipleProjects: -> Projects.find({}, fields: _id: 1).count() > 1

	getProjectName: -> Projects.findOne(@projectId, fields: name: 1).name

Template.request.events

	'click .missing.shift>.vertical-timeline-content': (e) ->
		shiftId = @_id
		userId = Meteor.userId()

		for team in @teams
			for participant in team.participants when participant._id == userId
				teamId = team._id

		FlowRouter.setQueryParams 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showTags: [@tagId]
			showShiftReport: shiftId
			reportTeamId: teamId

		false
