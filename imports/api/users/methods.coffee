import SimpleSchema from 'simpl-schema'

import { Validators } from '/imports/util/validators.coffee'

import { ProfileMethods } from './profile.coffee'
import { VacationMethods } from './vacation.coffee'
import { PermissionMethods } from './permissions.coffee'
import { AvailabilityMethods } from './availability.coffee'

export Methods =

	profile: ProfileMethods

	availability: AvailabilityMethods

	vacation: VacationMethods

	permissions: PermissionMethods

	picture: remove: new ValidatedMethod
		name: 'Meteor.users.methods.picture.remove'
		validate: ->
		run: -> Pictures.remove userId: Meteor.userId()

	state: set: new ValidatedMethod
		name: 'Meteor.users.methods.state.set'
		validate: (args) ->
			Validators.isAdmin args.projectId
			new SimpleSchema
				projectId: type: String
				userId: type: String
				state:
					type: String
					allowedValues: ['created', 'invited', 'active']
			.validator()
		run: (args) ->
			Meteor.users.update args.userId, $set: state: args.state

	remove: new ValidatedMethod
		name: 'Meteor.users.methods.remove'
		validate: ->
		run: (args) -> Meteor.users.remove Meteor.userId() if Meteor.isServer
