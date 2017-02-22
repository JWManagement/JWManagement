import SimpleSchema from 'simpl-schema'

import { Validators } from '/imports/util/validators.coffee'
import { StringUtils } from '/imports/util/stringUtils.coffee'

import { Getters } from './methods/getters.coffee'
import { ProfileMethods } from './methods/profile.coffee'
import { VacationMethods } from './methods/vacation.coffee'
import { PermissionMethods } from './methods/permissions.coffee'
import { AvailabilityMethods } from './methods/availability.coffee'

export Methods =

	getters: Getters

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

	init: new ValidatedMethod
		name: 'Meteor.users.methods.init'
		validate:
			new SimpleSchema
				token: type: String
				username: type: String
				password: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			token = args.token
			username = args.username
			password = args.password

			if token
				user = Meteor.users.findOne 'services.password.reset.token': token,
					fields: _id: 1

				username = StringUtils.trim username
				username = StringUtils.removeSpecials username
				username = username.toLowerCase username

				if user?
					Accounts.setPassword user._id, password
					Accounts.setUsername user._id, username
					Meteor.users.update user._id, $set: state: 'active'
					true
				else
					throw new Meteor.Error 'noUserWithThisToken', 'error'
			else
				throw new Meteor.Error 'tokenError', 'error'

	remove: new ValidatedMethod
		name: 'Meteor.users.methods.remove'
		validate: ->
		run: (args) -> Meteor.users.remove Meteor.userId() if Meteor.isServer
