Meteor.methods

	getAllocationsWeek: (userId, week) ->
		check userId, String
		check week String

		start = moment(week).format('YYYYDDDD')
		end = moment(week).endOf('isoWeek').format('YYYYDDDD')

		shifts = Shifts.find date: $gte: parseInt(start), $lte: parseInt(end)

		count = 0
		for shift in shifts.fetch()
			for team in shift.teams
				for participant in team.participants
					if participant._id == userId then count++

		count

	getAllocationsLastN: (userId, days) ->
		check userId, String
		check days Number

		end = moment().format('YYYYDDDD')
		start = end - days

		shifts = Shifts.find date: $gte: parseInt(start), $lte: parseInt(end)

		count = 0
		for shift in shifts.fetch()
			for team in shift.teams
				for participant in team.participants
					if participant._id == userId then count++

		count
