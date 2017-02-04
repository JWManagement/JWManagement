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
		thisDate = parseInt moment(new Date).format 'YYYYDDDD'
		thisTime = parseInt moment(new Date).format 'Hmm'

		if a == 'missing'
			reportSubmitted = false

			for team in @teams
				for user in team.participants when user._id == Meteor.userId() && user.thisTeamleader
					isTeamleader = true
					if team.report && team.report.submitted
						reportSubmitted = team.report.submitted

			(@date < thisDate || @date == thisDate && @end <= thisTime) && !reportSubmitted && isTeamleader
		else if a == 'accepted'
			for team in @teams
				for participant in team.participants
					value = value || Meteor.userId() == participant._id
			value
		else if a == 'pending'
			value = false
			for team in @teams
				for pendingUser in team.pending
					value = value || Meteor.userId() == pendingUser._id
			value
		else if a == 'declined'
			false

	pathForShift: ->
		FlowRouter.path 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showWeek: moment(@date, 'YYYYDDDD').format('GGGG[W]WW')
			showTags: @tagId
			showShift: @_id

	shiftRelation: ->
		thisDate = parseInt moment(new Date).format 'YYYYDDDD'
		thisTime = parseInt moment(new Date).format 'Hmm'

		for team in @teams
			for user in team.participants when user._id == Meteor.userId() && user.thisTeamleader
				isTeamleader = true
				if team.report && team.report.submitted
					reportSubmitted = team.report.submitted

		if (@date < thisDate || @date == thisDate && @end <= thisTime) && !reportSubmitted && isTeamleader
			'missing'
		else
			for team in @teams
				for participant in team.participants
					value = value || Meteor.userId() == participant._id
			if value
				'accepted'
			else
				value = false
				for team in @teams
					for pendingUser in team.pending
						value = value || Meteor.userId() == pendingUser._id
				if value
					'pending'
				else
					'declined'

	multipleProjects: -> Projects.find({}, fields: _id: 1).count() > 1

	getProjectName: -> Projects.findOne(@projectId).name
