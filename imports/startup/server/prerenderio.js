import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  const prerenderio = Npm.require('prerender-node');

  prerenderio.set('prerenderToken', 'z2nMr1jIoWf5M4aKY8bN');
  prerenderio.set('protocol', 'https');

  WebApp.rawConnectHandlers.use(prerenderio);
});
