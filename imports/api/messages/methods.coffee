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
			.validator()
		run: (args) ->
			newDoc =
				_id: Random.id()
				createdAt: new Date
				author:
					name: args.name
					email: args.email
				recipient:
					name: 'Support'
					email: 'support@jwmanagement.org'
				congregation: args.congregation
				text: args.message

			Messages.schema.validate newDoc

			Messages.insert newDoc
