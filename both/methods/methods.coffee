Meteor.isThisWeek = (date) ->
	firstDay = moment().startOf('isoWeek')
	lastDay = moment().endOf('isoWeek')

	moment(date, 'YYYYDDDD').isBetween(firstDay, lastDay, null, '[]')
