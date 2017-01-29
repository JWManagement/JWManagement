schemaMixin = (methodOptions) ->
	methodOptions.validate = methodOptions.schema.validator clean: true
	methodOptions

export addProjectEnquiry = new ValidatedMethod
	name: 'Messages.methods.addProjectEnquiry'
	mixins: [schemaMixin]
	schema: new SimpleSchema
		_id: type: String
		string: type: String
	run: (obj) ->
		Messages.insert
			_id: Random.id()
			author: obj.author
			recipient: obj.recipient
			text: obj.text
