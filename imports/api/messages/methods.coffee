import { Messages } from '/imports/api/messages/messages.coffee'

export Methods =

	addProjectEnquiry: new ValidatedMethod
		name: 'Messages.methods.addProjectEnquiry'
		validate:
			new SimpleSchema
				name: type: String
				email: type: SimpleSchema.RegEx.Email
				projectName: type: String
				message: type: String
				language:
					type: String
					allowedValues: ['de', 'en', 'hu', 'pt']
			.validator()
		run: (args) ->
			console.log args

			newDoc =
				author:
					name: args.name
					email: args.email
				projectName: args.projectName
				text: args.message
				language: args.language

			Messages.schema.clean newDoc
			Messages.schema.validate newDoc

			Messages.insert newDoc
