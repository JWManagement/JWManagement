Meteor.methods

	removeVacation: (vacationId) ->
		check vacationId, String

		Meteor.users.update Meteor.userId(), $pull: 'profile.vacations': _id: vacationId

	addVacation: (day) ->
		vacationId = Random.id 10

		Meteor.users.update Meteor.userId(), $addToSet: 'profile.vacations':
			_id: vacationId
			start: day
			end: day

		vacationId

	setVacationStart: (vacationId, start) ->
		if start != ''
			Meteor.users.update _id: Meteor.userId(), 'profile.vacations._id': vacationId,
				$set: 'profile.vacations.$.start': moment(start, 'DD.MM.YYYY').format('YYYYDDDD')

	setVacationEnd: (vacationId, end) ->
		if end != ''
			Meteor.users.update _id: Meteor.userId(), 'profile.vacations._id': vacationId,
				$set: 'profile.vacations.$.end': moment(end, 'DD.MM.YYYY').format('YYYYDDDD')
