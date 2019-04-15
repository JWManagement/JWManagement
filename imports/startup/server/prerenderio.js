import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

Meteor.startup(() => {
  const prerenderio = require('prerender-node')

  prerenderio.set('prerenderToken', '9KclarLZUey0x6jzotLl')
  prerenderio.set('protocol', 'https')

  WebApp.rawConnectHandlers.use(prerenderio)
})
