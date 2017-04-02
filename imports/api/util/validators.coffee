import { Projects } from '/imports/api/projects/projects.coffee'
import { Weeks } from '/imports/api/weeks/weeks.coffee'
import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from './permissions.coffee'

export Validators =

	user:

		validId: => Meteor.users.findOne(@value) || 'invalidUser'

	shift:

		validId: => Shifts.findOne(@value) || 'invalidShift'

		isTagParticipant: =>
			shift = Shifts.findOne @value, fields: tagId: 1
			'notTagParticipant' if !Roles.userIsInRole Meteor.userId(), Permissions.participant, shift.tagId

	week:

		validId: => Weeks.findOne(@value) || 'invalidWeek'

	project:

		validId: => Projects.findOne(@value) || 'invalidProject'

		isAdmin: => 'notAdmin' if !Roles.userIsInRole Meteor.userId(), Permissions.admin, @value

		isShiftAdmin: => 'notShiftAdmin' if !Roles.userIsInRole Meteor.userId(), Permissions.shiftAdmin, @value

		isMember: => 'notMember' if !Roles.userIsInRole Meteor.userId(), Permissions.member, @value

	tag:

		validId: => Projects.findOne('tags._id': @value) || 'invalidTag'

		isParticipant: => 'notTagParticipant' if !Roles.userIsInRole Meteor.userId(), Permissions.participant, @value

		isAdmin: =>
			project = Projects.findOne {'tags._id': @value}, fields: _id: 1
			'notAdmin' if !Roles.userIsInRole Meteor.userId(), Permissions.admin, project._id

	team:

		validId: => Projects.findOne('teams._id': @value) || 'invalidTeam'

	meetingPoint:

		validId: => Projects.findOne('meetings._id': @value) || 'invalidMeetingPoint'
