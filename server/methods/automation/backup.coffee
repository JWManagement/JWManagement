moment = require('moment')
AWS = require('aws-sdk')

{ Messages } = require('/imports/api/messages/messages.coffee')

exports.backup = ->

	AWS.config.update region: 'eu-central-1'
	s3 = new AWS.S3()
	bucket = 'jwmanagement-fs'
	folder = 'backups/' + moment().format() + '/'

	data =
		projects: -> Projects.find().fetch()
		shifts: -> Shifts.find().fetch()
		weeks: -> Weeks.find().fetch()
		users: -> Meteor.users.find().fetch()
		messages: -> Messages.find().fetch()

	for it in Object.keys(data)
		s3.putObject
			Bucket: bucket
			Key: folder + it + '.json'
			Body: JSON.stringify data[it]()
		, (e, d) -> if e then console.error e

	console.log 'Backup successfully completed!'
