import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => {
  const prerenderio = require('prerender-node');

  prerenderio.set('prerenderToken', 'z2nMr1jIoWf5M4aKY8bN');
  prerenderio.set('protocol', 'https');

  WebApp.rawConnectHandlers.use(prerenderio);
});
