@Weeks = new Meteor.Collection 'weeks'
@Shifts = new Meteor.Collection 'shifts'
@Projects = new Meteor.Collection 'projects'

@ProjectSubs = new SubsManager cacheLimit: 5

if Meteor.isServer
	# Its important to set `internal: true` this lets the SA know that we
	# are using this internally and it will give us direct SA api
	FS.TempStore.Storage = new FS.Store.GridFS('_tempstore', { internal: true });

if Meteor.isDevelopment
	@Files = new FS.Collection 'files',
		stores: [
			new FS.Store.FileSystem 'files', path: '~/files'
		]

	@Pictures = new FS.Collection 'pictures',
		filter:
			maxSize: 1048576
			allow:
				contentTypes: ['image/*']
				extensions: ['png', 'jpg', 'jpeg']
		stores: [
			new FS.Store.FileSystem 'images', path: '~/images'
		]
else
	@Files = new FS.Collection 'files',
		stores: [
			new FS.Store.S3 'files',
				region: 'eu-central-1'
				bucket: 'jwmanagement-fs'
				accessKeyId: process.env.AWS_ACCESS_KEY_ID
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
		]

	@Pictures = new FS.Collection 'pictures',
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
