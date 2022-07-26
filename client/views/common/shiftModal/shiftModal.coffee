import i18next from 'i18next'
import moment from 'moment'

`import TeamMember from '../../../../imports/ui/team/TeamMember'`

Template.shiftModal.helpers

	TeamMember: -> TeamMember

	isMeShiftScheduler: -> Roles.userIsInRole(Meteor.userId(), Permissions.shiftScheduler, FlowRouter.getParam('projectId'))

	getShiftId: -> FlowRouter.getQueryParam('showShift')

	getShift: -> Shifts.findOne FlowRouter.getQueryParam('showShift')

	sortUsers: (participants) ->
		participants.sort (a, b) ->
			if a.thisTeamleader then -1
			else if b.thisTeamleader then 1
			else
				aSplit = a.name.split(' ')
				bSplit = b.name.split(' ')

				if aSplit[aSplit.length-1] < bSplit[bSplit.length-1] then -1
				else if aSplit[aSplit.length-1] > bSplit[bSplit.length-1] then 1
				else if aSplit[0] < bSplit[0] then -1
				else if aSplit[0] > bSplit[0] then 1
				else 0

	schedulingIsDirect: ->
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields: scheduling: 1
		shift.scheduling == 'direct'

	meetingStartOrEnd: -> @meetingStart? || @meetingEnd?

	teamPicture: -> Pictures.findOne projectId: FlowRouter.getParam('projectId'), teamId: @_id

	meetingPicture: (meetingId) -> Pictures.findOne projectId: FlowRouter.getParam('projectId'), meetingId: meetingId

	getSelectedCount: (teamId) ->
		selectedCount = 0
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields:
			'teams._id': 1
			'teams.participants._id': 1
			'teams.pending.checked': 1

		if shift && shift.teams
			for team in shift.teams when team._id == teamId
				for user in team.pending when user.checked
					selectedCount++

			if selectedCount > 0
				for user in team.participants
					selectedCount++

		selectedCount

	getHasTl: (teamId) ->
		tlCount = 0
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields:
			'teams._id': 1
			'teams.participants.checked': 1
			'teams.participants.teamleader': 1
			'teams.participants.substituteTeamleader': 1
			'teams.pending.checked': 1
			'teams.pending.teamleader': 1
			'teams.pending.substituteTeamleader': 1

		for team in shift.teams when team._id == teamId
			for user in team.participants when user.substituteTeamleader || user.teamleader
				tlCount++
			for user in team.pending when user.checked && (user.substituteTeamleader || user.teamleader)
				tlCount++

		if tlCount > 0
			i18next.t('modal.shift.existingTeamleaders', tlCount)
		else
			i18next.t('modal.shift.noExistingTeamleader')

	hasTl: (teamId) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields:
			'teams._id': 1
			'teams.participants.thisTeamleader': 1
			'teams.pending.checked': 1
			'teams.pending.teamleader': 1
			'teams.pending.substituteTeamleader': 1

		for team in shift.teams when team._id == teamId
			for user in team.participants when user.thisTeamleader
				return true

			for user in team.pending when user.checked
				if user.substituteTeamleader || user.teamleader
					return true

	notInOtherTeam: (e) ->
		userId = Meteor.userId()
		teamId = @_id
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields: teams: 1

		for team in shift.teams when team._id != teamId
			for participant in team.participants when participant._id == userId
				return false
		true

	alreadyOver: ->
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields: date: 1, end: 1

		if shift.date < parseInt moment(new Date).format('YYYYDDDD')
			true
		else if shift.date == parseInt moment(new Date).format('YYYYDDDD')
			if shift.end < parseInt moment(new Date).format('Hmm')
				true
			else
				false

	getIcon: (icon) ->
		if icon? then icon
		else 'map-signs'

Template.shiftModal.onCreated ->

	self = this
	shiftId = FlowRouter.getQueryParam('showShift')
	handle = ShiftSubs.subscribe 'shift', shiftId

	@autorun ->
		handle.ready Tracker.afterFlush ->
			$('#shiftModal').modal('show')
			$('#shiftModal').on 'hidden.bs.modal', ->
				wrs -> FlowRouter.setQueryParams showShift: null
				$('.skipping').addClass('animated').removeClass('skipping')

			shift = Shifts.findOne shiftId

			if shift? && shift.teams?
				for team in shift.teams
					self.subscribe 'userStatistics', user._id, shiftId for user in team.participants
					self.subscribe 'userStatistics', user._id, shiftId for user in team.pending
					self.subscribe 'userStatistics', user._id, shiftId for user in team.declined

Template.shiftModal.events

	'click .requestTeam': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')

		Meteor.call 'request', shiftId, @_id, handleError

	'click .cancelRequestTeam': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')

		Meteor.call 'cancelRequest', shiftId, @_id

	'click .cancelParticipation': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id

		swalYesNo
			swal: 'request.cancel'
			doConfirm: -> Meteor.call 'cancelParticipation', shiftId, teamId, handleError

	'click .setLeader': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = $(e.target).closest('.team').attr('data-id')
		userId = @_id

		Meteor.call 'isTeamInformed', shiftId, teamId, 1, (err, informed) ->
			if informed
				swalYesNo
					swal: 'sendMail.teamUpdate.general'
					doConfirm: ->
						Meteor.call 'setLeader', shiftId, teamId, userId, handleError
			else
				Meteor.call 'setLeader', shiftId, teamId, userId, handleError

	'click .approveRequest': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields: teams: 1
		teamId = $(e.target).closest('.team').data('id')
		teamMin = $(e.target).closest('.team').data('min')
		teamMax = $(e.target).closest('.team').data('max')
		userId = @_id
		isPossibleTeamleader = @teamleader
		hasTeamleader = false
		participantCount = 1
		wouldCancelOtherTeam = false

		for team in shift.teams when team._id != teamId
			amInTeam = false
			hasTeamleader = false
			minLimitIsReached = false

			if team.participants.length == team.min
				minLimitIsReached = true

			for participant in team.participants
				if participant._id == userId
					amInTeam = true
				else if participant.teamleader || participant.substituteTeamleader
					hasTeamleader = true

			if amInTeam && (minLimitIsReached || !hasTeamleader)
				wouldCancelOtherTeam = true

		for team in shift.teams when team._id == teamId
			for participant in team.participants
				participantCount++

				if participant.thisTeamleader
					hasTeamleader = true

		if wouldCancelOtherTeam
			swal i18next.t('swal.error'), i18next.t('swal.publisherInOtherTeam'), 'error'
		else if hasTeamleader || isPossibleTeamleader
			if participantCount < teamMin
				swalYesNo
					swal: 'request.minNotReached'
					textAttr1: teamMin
					textAttr2: participantCount
					doConfirm: ->
						Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'min', participantCount, handleError
						Meteor.call 'approveRequest', shiftId, teamId, userId, (e, r) -> if !e && !hasTeamleader
							Meteor.call 'setLeader', shiftId, teamId, userId, handleError
			else if participantCount > teamMax
				swalYesNo
					swal: 'request.maxReached'
					textAttr1: teamMax
					textAttr2: participantCount
					doConfirm: ->
						Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'max', participantCount, handleError
						Meteor.call 'approveRequest', shiftId, teamId, userId, (e, r) -> if !e && !hasTeamleader
							Meteor.call 'setLeader', shiftId, teamId, userId, handleError
			else
				swalYesNo
					swal: 'request.approve'
					doConfirm: ->
						Meteor.call 'approveRequest', shiftId, teamId, userId, (e, r) -> if !e && !hasTeamleader
							Meteor.call 'setLeader', shiftId, teamId, userId, handleError
		else
			swal i18next.t('swal.noTeamleader'), '', 'error'

	'click .approveSelected': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		$team = $(e.target).closest('.team')
		teamId = $team.attr('data-id')
		teamMin = parseInt($team.attr('data-min'))
		teamMax = parseInt($team.attr('data-max'))
		selectedCount = 0

		checkWouldCancelOtherTeam = ->
			wouldCancelOtherTeam = false
			shift = Shifts.findOne shiftId, fields: teams: 1

			for checkbox in $team.find('input[type=checkbox]')
				userId = $(checkbox).attr('id').split('_')[1]

				for team in shift.teams when team._id != teamId
					amInTeam = false
					hasTeamleader = false
					minLimitIsReached = false

					if team.participants.length == team.min
						minLimitIsReached = true

					for participant in team.participants
						if participant._id == userId
							amInTeam = true
						else if participant.teamleader || participant.substituteTeamleader
							hasTeamleader = true

					if amInTeam && (minLimitIsReached || !hasTeamleader)
						wouldCancelOtherTeam = true

			if wouldCancelOtherTeam
				swal i18next.t('swal.error'), i18next.t('swal.publisherInOtherTeam'), 'error'

			!wouldCancelOtherTeam

		doApprove = ->
			chosenId = ''
			chosenIsTeamleader = false
			chosenIsSubstituteTeamleader = false
			alreadyHasTeamleader = false
			shift = Shifts.findOne shiftId, fields: teams: 1

			for team in shift.teams when team._id == teamId
				for user in team.participants when user.thisTeamleader
					alreadyHasTeamleader = true

				for user in team.pending when user.checked
					Meteor.call 'approveRequest', shiftId, teamId, user._id, handleError

					if chosenId
						if chosenIsSubstituteTeamleader && user.teamleader
							chosenId = user._id
							chosenIsTeamleader = true
							chosenIsSubstituteTeamleader = false
					else if user.substituteTeamleader
						chosenId = user._id
						chosenIsSubstituteTeamleader = true
					else if user.teamleader
						chosenId = user._id
						chosenIsTeamleader = true
				break

			if chosenId && !alreadyHasTeamleader
				Meteor.call 'setLeader', shiftId, teamId, chosenId, handleError

		selectedCount++ for checkbox in $team.find('input[type=checkbox]') when checkbox.checked
		selectedCount++ for participant in $team.find('.participant')

		if selectedCount < teamMin
			swalYesNo
				swal: 'request.minNotReached'
				textAttr1: teamMin
				textAttr2: selectedCount
				doConfirm: -> if checkWouldCancelOtherTeam()
					Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'min', selectedCount, handleError
					doApprove()
		else if selectedCount > teamMax
			swalYesNo
				swal: 'request.maxReached'
				textAttr1: teamMax
				textAttr2: selectedCount
				doConfirm: -> if checkWouldCancelOtherTeam()
					Meteor.call 'updateShiftItem', shiftId, 'teams', teamId, 'max', selectedCount, handleError
					doApprove()
		else if checkWouldCancelOtherTeam()
			doApprove()

	'click .declineParticipant': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		shift = Shifts.findOne shiftId, fields: teams: 1, scheduling: 1
		$team = $(e.target).closest('.team')
		teamId = $(e.target).closest('.team').attr('data-id')
		teamMin = parseInt($team.attr('data-min'))
		userId = @_id
		participants = 0
		wasTeamleader = false
		otherTeamleaderExists = false
		manualScheduling = (shift.scheduling == 'manual')

		for team in shift.teams when team._id == teamId
			for participant in team.participants
				participants++

				if participant._id == userId
					wasTeamleader = wasTeamleader || participant.thisTeamleader
				else if participant.substituteTeamleader || participant.teamleader
					otherTeamleaderExists = true

		if participants == teamMin && participants > 1
			swalYesNo
				swal: 'request.minReached'
				close: !manualScheduling
				doConfirm: ->
					if manualScheduling
						swalYesNo
							swal: 'sendMail.understaffed'
							doConfirm: -> Meteor.call 'sendUnderstaffed', shiftId, teamId
					Meteor.call 'cancelTeam', shiftId, teamId, 'missingParticipant', handleError

		else if wasTeamleader && !otherTeamleaderExists && participants > 1
			swalYesNo
				swal: 'request.noNewTeamleader'
				close: !manualScheduling
				doConfirm: ->
					if manualScheduling
						swalYesNo
							swal: 'sendMail.understaffed.teamleader'
							doConfirm: -> Meteor.call 'sendUnderstaffed', shiftId, teamId
					Meteor.call 'cancelTeam', shiftId, teamId, 'missingParticipant', handleError
		else
			swalYesNo
				swal: 'request.decline'
				doConfirm: -> Meteor.call 'declineParticipant', shiftId, teamId, userId, handleError


	'click .declineSelected': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id

		for pending in @pending when pending.checked
			Meteor.call 'declineRequest', shiftId, teamId, pending._id, handleError

	'click .removeSelected': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id

		for pending in @pending when pending.checked
			Meteor.call 'removeRequest', shiftId, teamId, pending._id, handleError

	'click input[type=checkbox]': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id
		userId = $(e.target).attr('id').split('_')[2]

		Meteor.call 'setPendingStatus', shiftId, teamId, userId, e.target.checked

	'click .addParticipant': (e) ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = $(e.target).closest('.team').attr('data-id')

		$('#shiftModal').modal('hide')

		wrs -> FlowRouter.setQueryParams
			showShift: null
			shiftId: shiftId
			teamId: teamId
			addParticipant: true

	'click .cancelTeam': ->
		$('#shiftModal').modal('hide')
		shiftId = FlowRouter.getQueryParam 'showShift'
		teamId = @_id

		wrs -> FlowRouter.setQueryParams
			cancelTeam: teamId
			shiftId: shiftId

	'click .openTeam': ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id

		Meteor.call 'openTeam', shiftId, teamId, handleError

	'click .closeTeam': ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id

		Meteor.call 'closeTeam', shiftId, teamId, handleError

	'click .sendUnderstaffed': ->
		shiftId = FlowRouter.getQueryParam('showShift')
		teamId = @_id

		swalYesNo
			swal: 'sendMail.understaffed'
			doConfirm: -> Meteor.call 'sendUnderstaffed', shiftId, teamId, handleError

	'click #switch': ->
		shiftId = FlowRouter.getQueryParam 'showShift'
		wrs -> FlowRouter.setQueryParams editShift: shiftId

	'click .sentConfirmation': (e) ->
		swal i18next.t('swal.approvalInformed'), '', 'info'

	'click .sendConfirmation': (e) ->
		shiftId = FlowRouter.getQueryParam 'showShift'
		teamId = $(e.target).closest('.team').attr('data-id')
		userId = @_id

		Meteor.call 'isTeamleaderInformed', shiftId, teamId, (err, informed) ->
			swalYesNo
				swal: 'sendMail.confirmation'
				close: !informed
				doConfirm: ->
					Meteor.call 'sendConfirmation', shiftId, teamId, userId

					if informed
						swalYesNo
							swal: 'sendMail.teamUpdate.user'
							doConfirm: ->
								Meteor.call 'sendTeamUpdate', shiftId, teamId, 'participant'

	'click .sentDeclined': (e) ->
		swal i18next.t('swal.declinementInformed'), '', 'info'

	'click .sendDeclined': (e) ->
		shiftId = FlowRouter.getQueryParam 'showShift'
		teamId = $(e.target).closest('.team').attr('data-id')
		userId = @_id

		swalYesNo
			swal: 'sendMail.declined'
			doConfirm: -> Meteor.call 'sendDeclined', shiftId, teamId, userId
