import i18next from 'i18next'
import moment from 'moment'

Template.editShiftModal.helpers

	admin: -> true

	isStatus: (a) -> @status == a

	isRelation: (a) -> @relation == a

	getShift: ->
		shiftId = FlowRouter.getQueryParam('editShift')
		Shifts.findOne shiftId

	getTags: ->
		projectId = FlowRouter.getParam('projectId')
		project = Projects.findOne projectId, fields: tags: 1
		project?.tags

	getScheduling: ->
		if @scheduling?
			schedulings = {
				direct: i18next.t('scheduling.direct')
				manual: i18next.t('scheduling.manual')
			}
			schedulings[@scheduling]

	possibleTeams: ->
		projectId = FlowRouter.getParam('projectId')
		project = Projects.findOne projectId, fields: teams: 1
		project?.teams

	possibleMeetings: ->
		projectId = FlowRouter.getParam('projectId')
		project = Projects.findOne projectId, fields: meetings: 1
		project?.meetings

	getMeetingStart: -> @meetingStart?.name || i18next.t('modal.editShift.noMeeting')

	getMeetingEnd: -> @meetingEnd?.name || i18next.t('modal.editShift.noMeeting')

	getPlace: -> @place?.name || i18next.t('modal.editShift.noMeeting')

	possibleTeamSizes: -> [1..15]

	isTemplate: -> FlowRouter.getQueryParam('weekId')?

Template.editShiftModal.onCreated ->

	projectId = FlowRouter.getParam('projectId')
	shiftId = FlowRouter.getQueryParam('editShift')

	ProjectSubs.subscribe 'tags', projectId
	ProjectSubs.subscribe 'teams', projectId
	ProjectSubs.subscribe 'meetings', projectId

	@autorun ->
		handle = ShiftSubs.subscribe 'shift', shiftId
		handle.ready Tracker.afterFlush ->
			$('#editShiftModal').modal('show')
			$('#editShiftModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams editShift: undefined

Template.editShiftModal.events

	'change #start': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		start = parseInt(moment($(e.target).val(), 'HH:mm').format('Hmm'))

		Meteor.call 'updateShift', shiftId, 'start', start, handleError

		for team in @teams when team.meetingStart?
			Meteor.call 'updateShiftItem', shiftId, 'teams', team._id, 'meetingStart.time', start, handleError

	'change #end': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		end = parseInt(moment($(e.target).val(), 'HH:mm').format('Hmm'))

		Meteor.call 'updateShift', shiftId, 'end', end, handleError

		for team in @teams when team.meetingEnd?
			Meteor.call 'updateShiftItem', shiftId, 'teams', team._id, 'meetingEnd.time', end, handleError

	'click .changeTag': (e) ->
		tagId = @_id
		tagName = @name
		shiftId = FlowRouter.getQueryParam('editShift')

		Meteor.call 'updateShift', shiftId, 'tagId', tagId, handleError
		Meteor.call 'updateShift', shiftId, 'tag', tagName, handleError

	'click .changeScheduling': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		scheduling = $(e.target).attr('scheduling')

		Meteor.call 'updateShift', shiftId, 'scheduling', scheduling, handleError

	'click .changeTeam': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')
		newTeamId = @_id
		newTeamName = @name
		newTeamIcon = @icon
		newTeamDescription = @description

		if teamId != newTeamId
			Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, '_id', newTeamId, (e) ->
				if e
					handleError e
				else
					Meteor.call 'updateShiftItem', shiftId, 'teams', newTeamId, 'name', newTeamName, handleError
					Meteor.call 'updateShiftItem', shiftId, 'teams', newTeamId, 'icon', newTeamIcon, handleError
					Meteor.call 'updateShiftItem', shiftId, 'teams', newTeamId, 'description', newTeamDescription, handleError

	'click .decreaseCount': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = @_id
		size = parseInt($(e.target).attr('size'))-1
		type = $(e.target).attr('type')

		if type == 'max'
			min = parseInt $(e.target).closest('.form-group').prev().find('.decreaseCount').attr('size')

		if size > 0 && (type == 'min' || min <= size)
			Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, type, size, handleError

	'click .increaseCount': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = @_id
		size = parseInt($(e.target).attr('size'))+1
		type = $(e.target).attr('type')

		if type == 'min'
			max = parseInt $(e.target).closest('.form-group').next().find('.increaseCount').attr('size')

		if size > 0 && (type == 'max' || size <= max)
			Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, type, size, handleError

	'click .changeMeetingStart': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')
		shift = Shifts.findOne shiftId, fields: 'start': 1
		self = this

		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingStart', { _id: self._id }, handleError
		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingStart.name', self.name, handleError
		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingStart.time', shift.start, handleError

	'click .removeMeetingStart': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')

		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingStart', null, handleError

	'click .changeMeetingEnd': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')
		shift = Shifts.findOne shiftId, fields: 'end': 1
		self = this

		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingEnd', { _id: self._id }, handleError
		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingEnd.name', self.name, handleError
		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingEnd.time', shift.end, handleError

	'click .removeMeetingEnd': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')

		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'meetingEnd', null, handleError

	'click .changePlace': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')
		shift = Shifts.findOne shiftId, fields: 'place': 1
		self = this

		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'place', { _id: self._id }, handleError
		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'place.name', self.name, handleError
		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'place.time', shift.end, handleError

	'click .removePlace': (e) ->
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = $(e.target).closest('.team').attr('teamId')

		Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'place', null, handleError

	'click #removeTeam': (e) ->
		e.preventDefault()
		shiftId = FlowRouter.getQueryParam('editShift')
		teamId = @_id

		if $('.teams-wrapper').find('.team').length > 1
			Meteor.call 'removeShiftItem', shiftId, 'teams', teamId, handleError
		else
			swal i18next.t('swal.error'), i18next.t('swal.onlyTeam'), 'error'

	'click #addTeam': (e) ->
		e.preventDefault()
		shiftId = @_id

		team =
			min: 2
			max: 3
			meetingStart: null
			meetingEnd: null
			participants: []

		Meteor.call 'addShiftItem', shiftId, 'teams', team, handleError

	'click #removeShift': ->
		shiftId = @_id
		$('#editShiftModal').modal('hide')

		swalYesNo
			swal: 'delete.shift'
			type: 'warning'
			close: false
			doConfirm: ->
				Meteor.call 'removeShift', shiftId, (error) ->
					if error
						swal 'Error ' + error.error, error.reason, 'error'
					else
						swalClose()
						wrs -> FlowRouter.setQueryParams editShift: null
			doCancel: ->
				wrs -> FlowRouter.setQueryParams editShift: shiftId

	'click #switch': ->
		shiftId = FlowRouter.getQueryParam 'editShift'
		wrs -> FlowRouter.setQueryParams showShift: shiftId

	'click #copyShift': ->
		shiftId = FlowRouter.getQueryParam 'editShift'

		wrs -> FlowRouter.setQueryParams copyShift: shiftId
