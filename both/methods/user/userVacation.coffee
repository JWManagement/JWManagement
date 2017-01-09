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
		Meteor.users.update _id: Meteor.userId(), 'profile.vacations._id': vacationId,
			$set: 'profile.vacations.$.start': moment(start, 'MM-DD-YYYY').format('YYYYDDDD')

	setVacationEnd: (vacationId, end) ->
		Meteor.users.update _id: Meteor.userId(), 'profile.vacations._id': vacationId,
			$set: 'profile.vacations.$.end': moment(end, 'MM-DD-YYYY').format('YYYYDDDD')
