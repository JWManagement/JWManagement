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
