@Weeks = new Meteor.Collection 'weeks'
@Shifts = new Meteor.Collection 'shifts'
@Projects = new Meteor.Collection 'projects'

@ProjectSubs = new SubsManager cacheLimit: 100
@WeekSubs = new SubsManager cacheLimit: 100
@ShiftSubs = new SubsManager cacheLimit: 1000
@UserSubs = new SubsManager cacheLimit: 100
@DashboardSubs = new SubsManager cacheLimit: 10
@FileSubs = new SubsManager cacheLimit: 100
@PictureSubs = new SubsManager cacheLimit: 100

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
			new FS.Store.FileSystem 'thumbs',
				path: '~/thumbs'
				transformWrite: resizeImageStream width: 128, height: 128
		,
			new FS.Store.FileSystem 'pictures',
				path: '~/pictures'
				transformWrite: resizeImageStream width: 256, height: 256
		,
			new FS.Store.FileSystem 'images',
				path: '~/images'
		]
else
	@Files = new FS.Collection 'files',
		stores: [
			new FS.Store.S3 'files',
				region: 'eu-central-1'
				bucket: 'jwmanagement-fs'
				accessKeyId: process.env.AWS_ACCESS_KEY_ID
				secretAccessKey: process.env.AWS_ACCESS_KEY
		]

	@Pictures = new FS.Collection 'pictures',
		filter:
			maxSize: 1048576
			allow:
				contentTypes: ['image/*']
				extensions: ['png', 'jpg', 'jpeg']
		stores: [
			new FS.Store.S3 'thumbs',
				region: 'eu-central-1'
				bucket: 'jwmanagement-fs'
				folder: 'thumbs'
				accessKeyId: process.env.AWS_ACCESS_KEY_ID
				secretAccessKey: process.env.AWS_ACCESS_KEY
				transformWrite: resizeImageStream width: 128, height: 128
		,
			new FS.Store.S3 'pictures',
				region: 'eu-central-1'
				bucket: 'jwmanagement-fs'
				folder: 'pictures'
				accessKeyId: process.env.AWS_ACCESS_KEY_ID
				secretAccessKey: process.env.AWS_ACCESS_KEY
				transformWrite: resizeImageStream width: 256, height: 256
		,
			new FS.Store.S3 'images',
				region: 'eu-central-1'
				bucket: 'jwmanagement-fs'
				folder: 'images'
				accessKeyId: process.env.AWS_ACCESS_KEY_ID
				secretAccessKey: process.env.AWS_ACCESS_KEY
		]
