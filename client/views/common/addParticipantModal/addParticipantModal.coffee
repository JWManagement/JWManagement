moment = require('moment')

Template.addParticipantModal.helpers

	getUsers: ->
		projectId = FlowRouter.getParam('projectId')
		shiftId = FlowRouter.getQueryParam('shiftId')

		shift = Shifts.findOne shiftId, fields: tagId: 1, date: 1, start: 1, end: 1

		if shift?
			users = Roles.getUsersInRole Permissions.member, projectId,
				fields:
					'profile.firstname': 1
					'profile.lastname': 1
					'profile.available': 1
					'profile.vacations': 1
					'profile.shortTermCalls': 1
					'profile.shortTermCallsAlways': 1

			users = users.fetch().filter((u) -> u._id != 'adm')

			if users.length > 1
				users = users.filter (user) -> Roles.userIsInRole user._id, Permissions.participant, shift.tagId

				users = users.map (user) ->
					available = false

					if shift.end > shift.start
						numbers = []
						index = shift.end

						while index > shift.start
							index -= 100
							numbers.push index

						shiftDay = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'so'][moment(shift.date, 'YYYYDDDD').isoWeekday() - 1]

						if user.profile.available
							for day in Object.keys user.profile.available when day == shiftDay
								available = true

								for time in numbers when time not in user.profile.available[day]
									available = false

						if user.profile.vacations?
							for vacation in user.profile.vacations
								now = parseInt shift.date
								start = parseInt vacation.start
								end = parseInt vacation.end

								if now >= start && now <= end
									isVacation = true

					_id: user._id
					available: available
					isVacation: isVacation
					shortTerm: user.profile.shortTermCalls || user.profile.shortTermCallsAlways
					firstname: user.profile.firstname
					lastname: user.profile.lastname

				users.sort (a, b) ->
					if a.isVacation && !b.isVacation
						1
					else if !a.isVacation && b.isVacation
						-1
					else if !a.available && b.available
						1
					else if a.available && !b.available
						-1
					else if !a.shortTerm && b.shortTerm
						1
					else if a.shortTerm && !b.shortTerm
						-1
					else if a.lastname > b.lastname
						1
					else if a.lastname < b.lastname
						-1
					else if a.firstname > b.firstname
						1
					else if a.firstname < b.firstname
						-1
					else
						0

	selectedClass: -> 'active' if @_id == FlowRouter.getQueryParam('participantId')

Template.addParticipantModal.onRendered ->

	@autorun -> UserSubs.subscribe 'usersByProject', FlowRouter.getParam('projectId')

	$('#beamerSelector').addClass('hidden')

	$('#addParticipantModal').modal('show')
	$('#addParticipantModal').on 'hidden.bs.modal', ->
		shiftId = FlowRouter.getQueryParam('shiftId')

		wrs -> FlowRouter.setQueryParams
			addParticipant: null
			shiftId: null
			teamId: null
			participantId: null
			showShift: shiftId

Template.addParticipantModal.events

	'click #setUser': (e) ->
		e.preventDefault()

		if FlowRouter.getQueryParam('participantId') == @_id
			wrs -> FlowRouter.setQueryParams participantId: null
		else
			wrs -> FlowRouter.setQueryParams participantId: @_id

	'change #other-users': (e) ->
		wrs -> FlowRouter.setQueryParams participantId: $(e.target).val()

	'click #submit': ->
		shiftId = FlowRouter.getQueryParam('shiftId')
		teamId = FlowRouter.getQueryParam('teamId')
		participantId = FlowRouter.getQueryParam('participantId')

		Meteor.call 'addParticipant', shiftId, teamId, participantId, handleError
