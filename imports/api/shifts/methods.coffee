import { Shifts } from './shifts.coffee'

export Methods =

	asdf: new ValidatedMethod
		name: 'asdf'
		validate:
			new SimpleSchema
				name: type: String
			.validator()
		run: (args) ->
			newDoc =
				text: args.message

			Shifts.schema.clean newDoc
			Shifts.schema.validate newDoc

			Shifts.insert newDoc
