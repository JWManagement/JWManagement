export Pictures =
	if Meteor.isDevelopment
		new FS.Collection 'pictures',
			filter:
				maxSize: 1048576
				allow:
					contentTypes: ['image/*']
					extensions: ['png', 'jpg', 'jpeg']
			stores: [
				new FS.Store.FileSystem 'images', path: '~/images'
			]
	else
		new FS.Collection 'pictures',
			filter:
				maxSize: 1048576
				allow:
					contentTypes: ['image/*']
					extensions: ['png', 'jpg', 'jpeg']
			stores: [
				new FS.Store.S3 'images',
					region: 'eu-central-1'
					bucket: 'jwmanagement-fs'
					folder: 'images'
					accessKeyId: process.env.AWS_ACCESS_KEY_ID
					secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
			]
