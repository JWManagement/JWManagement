import SimpleSchema from 'simpl-schema'

export Reports =

	GetAchievementSummary: new ValidatedMethod
		name: 'Reports.GetAchievementSummary'
		validate:
			# TODO: check permissions
			new SimpleSchema
				projectId: type: String
				startDate: type: SimpleSchema.Integer
				endDate: type: SimpleSchema.Integer
			.validator()
		run: (args) -> if Meteor.isServer
			aggregationResult = Shifts.aggregate([
				$match:
					$and: [
						projectId: args.projectId
					,
						date: $gte: args.startDate
					,
						date: $lte: args.endDate
					]
			,
				$unwind: '$teams'
			,
				$group:
					_id: ''
					texts: $sum: '$teams.report.texts'
					speaks: $sum: '$teams.report.speaks'
					videos: $sum: '$teams.report.videos'
					hours: $sum: '$teams.report.hours'
					route: $sum: '$teams.report.experiences.route'
					good: $sum: '$teams.report.experiences.good'
					problems: $sum: '$teams.report.experiences.problems'
			])[0]

			aggregationResult ||
				_id: 0
				texts: 0
				speaks: 0
				videos: 0
				hours: 0
				route: 0
				good: 0
				problems: 0

	GetParticipantsCount: new ValidatedMethod
		name: 'Reports.GetParticipantsCount'
		validate:
			# TODO: check permissions
			new SimpleSchema
				projectId: type: String
				startDate: type: SimpleSchema.Integer
				endDate: type: SimpleSchema.Integer
			.validator()
		run: (args) -> if Meteor.isServer
			participants = Shifts.aggregate([
				$match:
					$and: [
						projectId: args.projectId
					,
						date: $gte: args.startDate
					,
						date: $lte: args.endDate
					]
			,
				$unwind: '$teams'
			,
				$unwind: '$teams.participants'
			,
				$project:
					_id: '$teams.participants._id'
			])
			.map (user) -> user._id

			fulltimeCount = participants.filter((userId, index, self) -> if userId?
				user = Meteor.users.findOne(userId, 'profile.pioneer': 1)

				unique = self.indexOf(userId) == index
				fulltime = user.profile.pioneer in ['regular', 'special', 'circuit', 'bethelite', 'ldc']
				fulltime && unique
			).length

			publisherCount = participants.filter((userId, index, self) -> if userId?
				user = Meteor.users.findOne(userId, 'profile.publisher': 1)

				unique = self.indexOf(userId) == index
				publisher = user.profile.pioneer in ['publisher', 'auxiliary']
				publisher && unique
			).length

			allCount = fulltimeCount + publisherCount

			fulltime: fulltimeCount, publishers: publisherCount, all: allCount
