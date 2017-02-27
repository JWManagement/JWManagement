import { Messages } from '/imports/api/messages/messages.coffee'

AWS = require 'aws-sdk'

export backup = ->

	AWS.config.update region: 'eu-central-1'
	s3 = new AWS.S3()
	bucket = 'jwmanagement-fs'
	folder = 'backups/' + moment().format() + '/'
	size = 10000

	data =
		projects: (obj) -> Projects.find(obj).fetch()
		shifts: (obj) -> Shifts.find(obj).fetch()
		weeks: (obj) -> Weeks.find(obj).fetch()
		users: (obj) -> Meteor.users.find(obj).fetch()
		messages: (obj) -> Messages.find(obj).fetch()

	for it in Object.keys(data)
		i = 0
		count = data[it]({}, fields: _id: 1).length

		while i * size < count
			skip = i * size

			s3.putObject
				Bucket: bucket
				Key: folder + it + '.' + i + '.json'
				Body: JSON.stringify data[it]({}, skip: skip, limit: size)
			, (e, d) -> if e then console.error e

			i++

	'Backup successfully completed!'
