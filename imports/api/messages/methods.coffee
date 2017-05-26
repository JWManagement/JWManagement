import { Messages } from '/imports/api/messages/messages.coffee'

export Methods =

	addProjectEnquiry: new ValidatedMethod
		name: 'Messages.methods.addProjectEnquiry'
		validate:
			new SimpleSchema
				name: type: String
				email: type: SimpleSchema.RegEx.Email
				congregation: type: String
				message: type: String
				language:
					type: String
					allowedValues: ['de', 'en', 'pt']
			.validator()
		run: (args) ->
			newDoc =
				author:
					name: args.name
					email: args.email
				congregation: args.congregation
				text: args.message
				language: args.language

			Messages.schema.clean newDoc
			Messages.schema.validate newDoc

			Messages.insert newDoc
