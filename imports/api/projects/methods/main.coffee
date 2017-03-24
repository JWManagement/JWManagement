import SimpleSchema from 'simpl-schema'

import { Projects } from '/imports/api/projects/projects.coffee'
import { Validators } from '/imports/util/validators.coffee'

export MainMethods =

	update: new ValidatedMethod
		name: 'Projects.methods.main.update'
		validate: (args) ->
			Validators.isAdmin args._id
			new SimpleSchema
				_id: type: String
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
			projectId = args._id
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
