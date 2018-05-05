import SimpleSchema from 'simpl-schema'
import SystemLanguages from '/imports/api/dropdowns/SystemLanguages.js';

export Methods =

	addProjectEnquiry: new ValidatedMethod
		name: 'Messages.methods.addProjectEnquiry'
		validate:
			new SimpleSchema
				name: type: String
				email: type: SimpleSchema.RegEx.EmailWithTLD
				projectName: type: String
				message: type: String
				language:
					type: String
					allowedValues: SystemLanguages.allowedValues
			.validator()
		run: (args) -> if Meteor.isServer
			newDoc =
				author:
					name: args.name
					email: args.email
				projectName: args.projectName
				text: args.message
				language: args.language

			{ Messages } = require '/imports/api/messages/messages.coffee'

			Messages.schema.clean newDoc, mutate: true
			Messages.schema.validate newDoc

			Messages.insert newDoc

	deleteProjectEnquiry: new ValidatedMethod
		name: 'Messages.methods.deleteProjectEnquiry'
		validate:
			new SimpleSchema
				messageId: type: String
			.validator()
		run: (args) -> if Meteor.isServer &&  Roles.userIsInRole Meteor.userId(), 'support'
			{ Messages } = require '/imports/api/messages/messages.coffee'

			Messages.update args.messageId, $set: status: 'done'
