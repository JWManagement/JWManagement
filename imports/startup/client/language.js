import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from 'moment';

import { wrs } from '/imports/framework/Functions/Async';

export { setLanguageOnAuth };

Meteor.startup(setLanguageOnAuth);

function setLanguageOnAuth() {
  moment.locale('en'); // default

  Tracker.autorun((tracker) => {
    if (Meteor.user() != null) {
      tracker.stop();

      const language = FlowRouter.current().params.language;
      const myLanguage = Meteor.user().profile.language;

      if (language != myLanguage) {
        wrs(() => FlowRouter.setParams({ language: myLanguage }));
      }

      if (moment.locale() != myLanguage) {
        moment.locale(myLanguage);
      }

      if (TAPi18n.getLanguage() != myLanguage) {
        TAPi18n.setLanguage(myLanguage);
      }
    }
  });
}
