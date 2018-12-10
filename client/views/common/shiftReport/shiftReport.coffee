Template.shiftReport.helpers

	getTeamId: -> FlowRouter.getQueryParam('reportTeamId')

	reportPage: -> Session.get('reportPage')

	isActive: (reportPage) ->
		if reportPage == Session.get('reportPage') then 'btn-primary' else 'btn-default'

	getShift: ->
		shiftId = FlowRouter.getQueryParam('showShiftReport')
		teamId = FlowRouter.getQueryParam('reportTeamId')
		shift = Shifts.findOne shiftId

		if shift?
			for team in shift.teams when team._id == teamId
				shift.team = team
			shift

	leader: ->
		for participant in @team.participants
			if participant.thisTeamleader
				leader = participant
		leader

	participantsNoLeader: ->
		publishers = []
		for participant in @team.participants when not participant.thisTeamleader
			publishers.push participant

		publishers

	wasState: (state) -> 'checked' if @state == state

	wasNeatness: (val) -> 'selected' if val == @team.report?.neatness

Template.shiftReport.onCreated ->

	Session.set 'reportPage', 0
	shiftId = FlowRouter.getQueryParam('showShiftReport')

	@autorun ->
		shiftId = FlowRouter.getQueryParam('showShiftReport')

		handle = ShiftSubs.subscribe 'shift', shiftId
		handle.ready Tracker.afterFlush ->
			$('#shiftReportModal').modal('show')
			$('#shiftReportModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams
					reportTeamId: undefined
					showShiftReport: undefined
					showShift: shiftId
				$('.skipping').addClass('animated').removeClass('skipping')

			teamId = FlowRouter.getQueryParam('reportTeamId')

			if shiftId && teamId
				Meteor.call 'initReport', shiftId, teamId

Template.shiftReport.onRendered ->

	$('#beamerSelector').addClass('hidden')

Template.shiftReport.onDestroyed ->

	wrs -> FlowRouter.setQueryParams reportTeamId: undefined

Template.shiftReport.events

	'click #nextReportPage': ->
		if Session.get('reportPage') < 4 then Session.set('reportPage', Session.get('reportPage')+1)

	'click #prevReportPage': ->
		if Session.get('reportPage') > 0 then Session.set('reportPage', Session.get('reportPage')-1)

	'click #finish': ->
		Meteor.call 'updateReport', @_id, @team._id, 'submitted', true
		$('#shiftReportModal').modal('hide')

	'click #publisherPage': -> Session.set 'reportPage', 0

	'click #itemsPage': -> Session.set 'reportPage', 1

	'click #occurrencesPage': -> Session.set 'reportPage', 2

	'click #storePage': -> Session.set 'reportPage', 3

	'click #experiencesPage': -> Session.set 'reportPage', 4

	'change .state': (e) ->
		state = $(e.target).attr('id').split('_')[0]
		shiftId = FlowRouter.getQueryParam('showShiftReport')

		Meteor.call 'updateParticipantState', shiftId, FlowRouter.getQueryParam('reportTeamId'), @_id, state

	'change #texts': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'texts', e.target.value

	'change #website': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'website', e.target.value

	'change #speaks': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'speaks', e.target.value

	'change #videos': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'videos', e.target.value

	'change #returnVisits': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'returnVisits', e.target.value

	'change #bibleStudies': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'bibleStudies', e.target.value

	'change #hours': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'hours', e.target.value

	'change #filled': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'filled', e.target.checked

	'change #neatness': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'neatness', e.target.value

	'change #route': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'experiences.route', e.target.value

	'change #goodExp': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'experiences.good', e.target.value

	'change #problems': (e) ->
		Meteor.call 'updateReport', @_id, @team._id, 'experiences.problems', e.target.value
