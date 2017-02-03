import { Messages } from '/imports/api/messages/messages.coffee'
import { Check } from '/imports/utils/checks.coffee'

export Methods =

	addProjectEnquiry: new ValidatedMethod
		name: 'Messages.methods.addProjectEnquiry'
		validate: (args) -> check args,
			name: String
			email: Check.Email
			congregation: String
			message: String
		run: (args) ->
			Messages.insert
				_id: Random.id()
				createdAt: moment().format()
				author:
					name: args.name
					email: args.email
				recipient:
					name: 'Support'
					email: 'support@jwmanagement.org'
				congregation: args.congregation
				text: args.message
