import { backup } from './backup.coffee'

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

	SyncedCron.add
		name: 'Backup'
		schedule: (parser) -> parser.text('every 1 day at 02:00 am')
		job: -> backup()

	SyncedCron.start()
