Meteor.methods

	resetRequests: (projectId, date) ->
		shiftIds = []

		week = Weeks.findOne
			projectId: projectId
			date: date

		for day in week.days
			for shift in day.shifts
				shiftIds.push shift

		shifts = Shifts.find _id: $in: shiftIds

		for shift in shifts.fetch()
			for team in shift.teams
				for user in team.participants
					user.thisTeamleader = false
					user.checked = false

					Shifts.update _id: shift._id, 'teams._id': team._id,
						$pull:
							'teams.$.participants': _id: user._id
							'teams.$.pending': _id: user._id
							'teams.$.declined': _id: user._id

					Shifts.update _id: shift._id, 'teams._id': team._id,
						$addToSet: 'teams.$.pending': user
