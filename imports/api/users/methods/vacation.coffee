export VacationMethods =

	add: new ValidatedMethod
		name: 'Meteor.users.methods.vacation.add'
		validate: ->
		run: -> if Meteor.isServer
			vacationId = Random.id 10

			Meteor.users.update Meteor.userId(), $addToSet: 'profile.vacations':
				_id: vacationId
				start: parseInt moment().format 'YYYYDDDD'
				end: parseInt moment().format 'YYYYDDDD'
			vacationId

	update: new ValidatedMethod
		name: 'Meteor.users.methods.vacation.update'
		validate:
			new SimpleSchema
				vacationId: type: String
				field:
					type: String
					allowedValues: ['start', 'end']
				value: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			set = {}
			set['profile.vacations.$.' + args.field] = parseInt moment(args.value, 'DD.MM.YYYY').format('YYYYDDDD')

			Meteor.users.update _id: Meteor.userId(), 'profile.vacations._id': args.vacationId,
				$set: set

	remove: new ValidatedMethod
		name: 'Meteor.users.methods.vacation.remove'
		validate:
			new SimpleSchema
				vacationId: type: String
			.validator()
		run: (args) -> if Meteor.isServer
			Meteor.users.update Meteor.userId(), $pull: 'profile.vacations': _id: args.vacationId
