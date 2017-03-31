import { Projects } from '/imports/api/projects/projects.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from './permissions.coffee'

export Validators =

	isTagParticipant: (shiftId) ->
		shift = Shifts.findOne shiftId, fields: tagId: 1

		if !Roles.userIsInRole Meteor.userId(), Permissions.participant, shift.tagId
			throw new Meteor.Error 'notTagParticipant', ''

	isAdmin: (projectId) ->
		if !Roles.userIsInRole Meteor.userId(), Permissions.admin, projectId
			throw new Meteor.Error 'notAdmin', ''

	isShiftAdmin: (projectId) ->
		if !Roles.userIsInRole Meteor.userId(), Permissions.shiftAdmin, projectId
			throw new Meteor.Error 'notShiftAdmin', ''

	custom:

		isUser: => Meteor.users.findOne(@value) || 'invalidUser'

		isShift: => Shifts.findOne(@value) || 'invalidShift'

		isWeek: => Weeks.findOne(@value) || 'invalidWeek'

		isProject: => Projects.findOne(@value) || 'invalidProject'

		isTag: => Projects.findOne('tags._id': @value) || 'invalidTag'

		isTeam: => Projects.findOne('teams._id': @value) || 'invalidTeam'

		isMeetingPoint: => Projects.findOne('meetings._id': @value) || 'invalidMeetingPoint'
