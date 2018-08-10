import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import moment from 'moment';

Meteor.methods({
  'language.update': ({}, {}, language) => {
    const userId = Meteor.userId();

    Meteor.users.update(userId, {
      $set: {
        'profile.language': language
      }
    });

    TAPi18n.setLanguage(language);
    moment.locale(language);

    FlowRouter.withReplaceState(() => {
      FlowRouter.setParams({ language: language });
    });
  }
});
