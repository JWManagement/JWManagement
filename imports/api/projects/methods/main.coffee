import SimpleSchema from 'simpl-schema'

import { Projects } from '/imports/api/projects/projects.coffee'
import { Validators } from '/imports/api/util/validators.coffee'

export MainMethods =

	update: new ValidatedMethod
		name: 'Projects.methods.main.update'
		validate: (args) ->
			new SimpleSchema
				projectId:
					type: String
					custom: ->
						Validators.project.validId
						Validators.project.isAdmin
				field:
					type: String
					allowedValues: [
						'name'
						'email'
						'language'
						'news'
					]
				value: type: String
			.validator() args
		run: (args) -> if Meteor.isServer
			projectId = args.projectId
			field = args.field
			value = args.value
			set = {}

			if value.trim() != ''
				if field == 'news'
					set =
						text: value
						date: moment().format()
				else
					set[field] = value

				Projects.update projectId, $set: set
			else
				throw new Meteor.Error 'invalidValue', ''

	updateArray:
		new ValidatedMethod
			name: 'Projects.methods.main.updateArray'
			validate: (args) ->
				new SimpleSchema
					projectId:
						type: String
						custom: ->
							Validators.project.validId
							Validators.project.isAdmin
					array:
						type: String
						allowedValues: [
							'tags'
							'teams'
							'meetings'
						]
					arrayId: type: String
					field:
						type: String
						allowedValues: [
							'name'
							'description'
							'link'
						]
					value: type: String
				.validator() args
			run: (args) -> if Meteor.isServer
				projectId = args.projectId
				array = args.array
				arrayId = args.arrayId
				field = args.field
				value = args.value

				if field != 'name' or value.trim() != ''
					find = _id: projectId
					find[array + '._id'] = arrayId

					set = {}
					set[array + '.$.' + field] = value

					Projects.update find, $set: set
				else
					throw new Meteor.Error 500, 'Name cannot be empty'

	addToArray:
		new ValidatedMethod
			name: 'Projects.methods.main.addToArray'
			validate: (args) ->
				Validators.isShiftAdmin args.projectId
				new SimpleSchema
					projectId: type: String
					array:
						type: String
						allowedValues: [
							'tags'
							'teams'
							'meetings'
						]
					name: type: String
				.validator() args
			run: (args) -> if Meteor.isServer
				projectId = args.projectId
				array = args.array
				name = args.name

				if array == 'tags'
					itemId = Random.id 6
				else if array == 'teams'
					itemId = Random.id 7
				else if array == 'meetings'
					itemId = Random.id 8

				addToSet = {}

				if array == 'tags'
					addToSet[array] = _id: itemId, name: name, templates: []
				else
					addToSet[array] = _id: itemId, name: name

				Projects.update projectId, $addToSet: addToSet

				if array == 'tags'
					Roles.addUsersToRoles Meteor.userId(), 'teamleader', itemId
