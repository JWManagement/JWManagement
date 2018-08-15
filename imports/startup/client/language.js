import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import moment from 'moment';

Meteor.startup(() => {
  Tracker.autorun((tracker) => {
    if (Meteor.user() != null) {
      tracker.stop();

      const language = FlowRouter.current().params.language;
      const myLanguage = Meteor.user().profile.language;

      if (language != myLanguage) {
        FlowRouter.withReplaceState(() => {
          FlowRouter.setParams({ language: myLanguage });
        });
      }

      if (TAPi18n.getLanguage() != myLanguage) {
        TAPi18n.setLanguage(myLanguage);
      }

      if (moment.locale() != myLanguage) {
        moment.locale(myLanguage);
      }
    }
  });
});
