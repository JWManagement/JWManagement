import { Shifts } from '/imports/api/shifts/shifts.coffee'
import { Permissions } from './permissions.coffee'

export Validators =

	isTagParticipant: (shiftId) ->
		shift = Shifts.findOne shiftId, fields: tagId: 1

		if !Roles.userIsInRole Meteor.userId(), Permissions.participant, shift.tagId
			throw new Meteor.Error 'notTagParticipant', ''
