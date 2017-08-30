Template.dashboard.helpers

	loading: -> !DashboardSubs.ready()

	pathForShift: ->
		FlowRouter.path 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showWeek: moment(@date, 'YYYYDDDD').format('GGGG[W]WW')
			showTags: @tagId
			showShift: @_id

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
		else if a == 'approved'
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
				'approved'
			else
				value = false
				for team in @teams
					for pendingUser in team.pending
						value = value || Meteor.userId() == pendingUser._id
				if value
					'pending'
				else
					'declined'

	teamRelation: ->
		for user in @participants when Meteor.userId() == user._id
			return 'approved'

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

	getUnderstaffedShifts: ->
		Shifts.find
			projectId: @_id
			teams:
				$elemMatch:
					participants: $eq: []
					pending: $gt: []
					status: 'open'
					min: $gt: 1

	getProjectName: -> Projects.findOne(@projectId).name

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
				for role in Permissions.member
					if role in me.roles[group]
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

	multipleProjects: -> Projects.find({}, fields: _id: 1).count() > 1

	multipleTags: -> if @tags then @tags.length > 1

	getTagPath: (tagId) -> FlowRouter.path 'shifts', { projectId:@_id, language:TAPi18n.getLanguage() }, showTags: tagId

	getAllTagsPath: (tags) ->
		tags = tags.map (tag) -> tag._id
		tags = tags.filter (t) -> Roles.userIsInRole Meteor.userId(), Permissions.participant, t._id

		FlowRouter.path 'shifts', { projectId:@_id, language:TAPi18n.getLanguage() }, showTags: tags.join('_')

	centerProject: -> 'col-lg-offset-3' if Projects.find({}, fields: _id: 1).count() == 1

	newsThere: -> @news?.text and @news.text != ''

	showShift: ->
		today = parseInt(moment().format('YYYYDDDD'))
		now = parseInt(moment().format('Hmm'))
		missingReport = false
		myShift = false

		for team in @teams
			for user in team.participants when user._id == Meteor.userId()
				myShift = true

				if user.thisTeamleader
					missingReport = true

					if team.report && team.report.submitted
						missingReport = false

			for user in team.pending when user._id == Meteor.userId()
				myShift = true

		myShift && (@date > today || @date == today && @end >= now || Session.get('showOlder') || missingReport)

	showOlder: -> Session.get 'showOlder'

Template.dashboard.onCreated ->

	DashboardSubs.subscribe 'dashboard'

	@autorun -> if DashboardSubs.ready()
		for shift in Shifts.find().fetch()
			ShiftSubs.subscribe 'shift', shift._id

Template.dashboard.onRendered ->

	$('.animated').removeClass('animated').addClass('skipped')

	Session.set 'showOlder', false

Template.dashboard.onDestroyed ->

	$('#shiftReport').modal('hide')

Template.dashboard.events

	'click #toShifts': (e) ->
		e.preventDefault()

		if $(e.target).closest('.project-wrapper').find('.tags-popup').length
			$(e.target).closest('.project-wrapper').addClass('show-tags-popup')

			$('.tags-popup').on 'click', (e) ->
				$(e.target).closest('.project-wrapper').removeClass('show-tags-popup')
		else
			if @tags.length > 0
				FlowRouter.go 'shifts',
					projectId: @_id
					language: TAPi18n.getLanguage()
				,
					showTags: @tags[0]._id
			else
				swal TAPi18n.__('swal.missingTag'), '', 'error'

	'click .shift-link': (e) ->
		e.preventDefault()

		FlowRouter.go 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showTags: @tagId
			showShift: @_id

	'click #editNews': (e) ->
		$('#'+@_id).find('.news-content').addClass('hidden')
		$('#'+@_id).find('.news-editor').removeClass('hidden')
		$('#'+@_id).find('.chars-left').html(140 - $('#'+@_id).find('#news-textarea').val().length + "/140")

	'click #cancelNews': (e) ->
		$('#'+@_id).find('.news-editor').addClass('hidden')
		$('#'+@_id).find('.news-content').removeClass('hidden')

	'click #changeNews': (e) ->
		projectId = @_id
		content = $('#'+@_id).find('#news-textarea').val().replace(/(?:\r\n|\r|\n)/g, '<br />')

		Meteor.call 'updateProject', @_id, 'news.date', moment().format()
		Meteor.call 'updateProject', @_id, 'news.text', content, ->
			$('#'+projectId).find('.news-editor').addClass('hidden')
			$('#'+projectId).find('.news-content').removeClass('hidden')

	'keyup #news-textarea': (e) ->
		$('#'+@_id).find('.chars-left').html(140 - $('#'+@_id).find('#news-textarea').val().length + "/140")

	'click .vertical-timeline-content[data-type="missing"]': (e) ->
		shiftId = @_id

		for team in @teams
			for participant in team.participants when participant._id == Meteor.userId()
				teamId = team._id

		FlowRouter.go 'shifts',
			projectId: @projectId
			language: TAPi18n.getLanguage()
		,
			showTags: @tagId
			showShiftReport: shiftId
			reportTeamId: teamId
		false

	'click #showOlder': -> Session.set 'showOlder', true
