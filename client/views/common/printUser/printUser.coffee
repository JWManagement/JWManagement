Template.printUser.helpers

	getUserStatistics: -> if @showStats
		s = UserStatistics.findOne @user._id

		return '(Loading statistics...)' if !s?

		getField = (field) ->
			if field == 'privileges'
				if s[field].split('/').length > 1
					TAPi18n.__('privileges.' + s[field].split('/')[0]) + '/' + TAPi18n.__('privileges.' + s[field].split('/')[1])
				else
					TAPi18n.__('privileges.' + s[field])
			else
				s[field]

		day = TAPi18n.__('period.d')
		week = TAPi18n.__('period.w')
		fourWeeks = TAPi18n.__('period.4w')

		result = ' (' + getField('privileges') + ')'
		result += ' ' + day + ':' + getField('countDayApproved') + '/' + getField('countDayOverall')
		result += ' ' + week + ':' + getField('countWeekApproved') + '/' + getField('countWeekOverall')
		result += ' ' + fourWeeks + ':' + getField('countWeeksApproved') + '/' + getField('countWeeksOverall')
