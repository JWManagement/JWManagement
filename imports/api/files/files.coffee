export Files =
	if Meteor.isDevelopment
		new FS.Collection 'files',
			stores: [
				new FS.Store.FileSystem 'files', path: '~/files'
			]
	else
		new FS.Collection 'files',
			stores: [
				new FS.Store.S3 'files',
					region: 'eu-central-1'
					bucket: 'jwmanagement-fs'
					accessKeyId: process.env.AWS_ACCESS_KEY_ID
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			]
