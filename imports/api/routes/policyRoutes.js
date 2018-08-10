import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import { wrs } from '/imports/framework/Functions.Async';

FlowRouter.route('/:language/privacy', {
  name: 'privacy',
  triggersEnter: () => {
    wrs(() => {
      TAPi18n.setLanguage('de');
      FlowRouter.setParams({ language: 'de' });
    });
  },
  action: () => {
    return BlazeLayout.render('blankLayout', { content: 'privacy' });
  }
});

FlowRouter.route('/:language/terms', {
  name: 'terms',
  triggersEnter: () => {
    wrs(() => {
      TAPi18n.setLanguage('de');
      FlowRouter.setParams({ language: 'de' });
    });
  },
  action: () => {
    BlazeLayout.render('blankLayout', { content: 'terms' });
  }
});
