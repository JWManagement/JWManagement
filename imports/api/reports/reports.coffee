import SimpleSchema from 'simpl-schema'

export Reports =

	GetAggregatedReportItemValue: new ValidatedMethod
		name: 'Reports.getAggregatedReportItemValue'
		validate:
			# TODO: check permissions
			new SimpleSchema
				projectId: type: String
				startDate: type: SimpleSchema.Integer
				endDate: type: SimpleSchema.Integer
				field:
					type: String
					allowedValues: ['texts', 'speaks', 'videos', 'hours', 'experiences.route', 'experiences.good', 'experiences.problems']
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
					_id: args.field
					sum: $sum: '$teams.report.' + args.field
			])[0]

			aggregationResult || _id: args.field, sum: 0
