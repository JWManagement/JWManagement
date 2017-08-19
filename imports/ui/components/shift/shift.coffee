import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Projects } from '/imports/api/projects/projects.coffee'
import { Permissions } from '/imports/api/util/permissions.coffee'
import { Dialogs } from '/imports/api/util/dialogs.coffee'
import { Delay } from '/imports/api/util/delay.coffee'
import { wrs } from '/imports/api/util/delay.coffee'
import { FR } from '/imports/api/util/flowrouter.coffee'

import './shift.tpl.jade'

Template.shift.helpers

	getShift: ->
		shift = {}

		shift = Shifts.findOne this + '', fields:
			tagId: 1
			tag: 1
			date: 1
			start: 1
			end: 1
			status: 1
			scheduling: 1
			'teams._id': 1
			'teams.name': 1
			'teams.status': 1
			'teams.participants': 1
			'teams.pending': 1

		if shift?
			shift.isWrongTag = false
			tags = FR.getShowTags()

			if tags && shift.tagId not in tags
				shift.isWrongTag = true
			else
				shift.isWrongTag = true

		shift

	multipleTags: ->
		tags = FR.getShowTags()
		tags && tags.indexOf('_') > -1

	getScheduling: -> if @scheduling?
		TAPi18n.__('scheduling.' + @scheduling)

	shiftClass: ->
		try
			if @date < parseInt moment().format 'YYYYDDDD'
				return 'closed'
			else if @date == parseInt moment().format 'YYYYDDDD'
				if @end < parseInt moment().format 'Hmm'
					return 'closed'

			if @teams
				for team in @teams
					for participant in team.participants when participant._id == Meteor.userId()
						return 'approved'
					for pending in team.pending when pending._id == Meteor.userId()
						return 'pending'
			@status

	getTeamStatus: (team) ->
		if @date < parseInt moment().format 'YYYYDDDD'
			return 'closed'
		else if @date == parseInt moment().format 'YYYYDDDD'
			if @end < parseInt moment().format 'Hmm'
				return 'closed'
		team.status

	adminClass: ->
		if Roles.userIsInRole Meteor.userId(), Permissions.shiftScheduler, FR.getProjectId()
			'isAdmin'
		else
			'noAdmin'

	directScheduling: -> @scheduling == 'direct'

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

	countTl: (pendings) -> pendings.filter((pending) -> pending.teamleader || pending.substituteTeamleader).length

Template.shift.onCreated ->

	@autorun => Meteor.subscribe 'shift', @data

Template.shift.events

	'click .shift': -> wrs => FlowRouter.setQueryParams showShift: @_id
