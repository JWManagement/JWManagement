import i18next from 'i18next'
import moment from 'moment'

Template.registerHelper 'format', (value, oldFormat, newFormat) ->
	i18next.language
	moment(value, oldFormat).format(newFormat)

Template.registerHelper 'formatTimeComparison', (a, b, showSuffix = true) ->
	language = i18next.language

	if language in ['en', 'en-US', 'en-GB', 'en-AU']
		if a < 60 then a = '00' + a
		if b < 60 then b = '00' + b
		v1 = moment(a, 'Hmm').format('h')
		v2 = moment(b, 'Hmm').format('h')
		e1 = moment(a, 'Hmm').format('mm')
		e2 = moment(b, 'Hmm').format('mm')
		suffix = moment(b, 'Hmm').format(' A')

		v1 += ':' + e1 if e1 > 0
		v2 += ':' + e2 if e2 > 0

		if showSuffix
			v1 + ' - ' + v2 + suffix
		else
			v1 + ' - ' + v2
	else
		if a < 60 then a = '00' + a
		if b < 60 then b = '00' + b
		v1 = moment(a, 'Hmm').format('H')
		v2 = moment(b, 'Hmm').format('H')
		e1 = moment(a, 'Hmm').format('mm')
		e2 = moment(b, 'Hmm').format('mm')

		v1 += ':' + e1 if e1 > 0
		v2 += ':' + e2 if e2 > 0

		if showSuffix
			v1 + ' - ' + v2 + ' ' + i18next.t('time.suffix')
		else
			v1 + ' - ' + v2

Template.registerHelper 'formatIsoWeekday', (a) ->
	i18next.language
	moment(new Date).isoWeekday(a).format('dddd')

Template.registerHelper 'formatWeek', (a) ->
	i18next.language
	a = FlowRouter.getQueryParam('showWeek') if a == 'showWeek'

	first = moment(a).format('D.')

	if moment(a).format('YYYY') != moment(a).add(6, 'd').format('YYYY')
		first += moment(a).format(' MMMM YYYY')
	else if moment(a).format('M') != moment(a).add(6, 'd').format('M')
		first += moment(a).format(' MMMM')

	first + ' ' + i18next.t('time.to') + ' ' + moment(a).add(6, 'd').format('D. MMMM YYYY')

Template.registerHelper 'formatTime', (time) ->
	i18next.language
	if time < 60 then time = '00' + time
	if time % 100 == 0
		moment(time, 'Hmm').format('H')
	else
		moment(time, 'Hmm').format('H:mm')

Template.registerHelper 'formatTimeWithSuffix', (time) ->
	language = i18next.language

	if time < 60 then time = '00' + time

	if language in ['en', 'en-US', 'en-GB', 'en-AU']
		suffix = moment(time, 'Hmm').format(' A')
	else
		suffix = ' ' + i18next.t('time.suffix')

	if time % 100 == 0
		moment(time, 'Hmm').format('H') + suffix
	else
		moment(time, 'Hmm').format('H:mm') + suffix

Template.registerHelper 'formatFromNow', (date, time) ->
	i18next.language
	string = moment(date, 'YYYYDDDD').format('YYYY-MM-DD ')
	string += moment(time, 'Hmm').format('HH:mm')
	moment().from(string)

Template.registerHelper 'formatToNow', (date, time) ->
	i18next.language
	string = moment(date, 'YYYYDDDD').format('YYYY-MM-DD ')
	string += moment(time, 'Hmm').format('HH:mm')
	moment().to(string)
