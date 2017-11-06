Meteor.startup ->

	prerenderio = Npm.require('prerender-node')
	prerenderio.set('prerenderToken', 'z2nMr1jIoWf5M4aKY8bN')
	prerenderio.set('protocol', 'https')
	WebApp.rawConnectHandlers.use(prerenderio)

import '/imports/startup/server/index.coffee'
