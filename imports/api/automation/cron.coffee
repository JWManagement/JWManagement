import { backup } from './backup.coffee'
import { shiftValidation } from './shiftValidation.coffee'

if Meteor.isProduction

	#SyncedCron.add
	#	name: 'Generate shift organization'
	#	schedule: (parser) -> parser.cron('at 20:00 pm on Sunday')
	#	job: -> Meteor.call('generateShiftOrganization')

	#SyncedCron.add
	#	name: 'Send weekly mail'
	#	schedule: (parser) -> parser.cron('at 20:00 pm on Sunday')
	#	job: -> Meteor.call('sendWeekSummary')

	#SyncedCron.add
	#	name: 'Create new weeks'
	#	schedule: (parser) -> parser.cron('at 20:00 pm on Sunday')
	#	job: -> Meteor.call('createNewWeeks')

	#SyncedCron.add
	#	name: 'Backup'
	#	schedule: (parser) -> parser.cron '0 2 * * *'
	#	job: -> backup()

	#SyncedCron.add
	#	name: 'Shift validation'
	#	schedule: (parser) -> parser.cron '*/5 * * * *'
	#	job: -> shiftValidation()

	SyncedCron.start()
