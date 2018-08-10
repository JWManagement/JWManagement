import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import moment from 'moment';

const Helpers = {

  checkLanguage: (c) => {
    if (Meteor.user() != null) {
      const language = FlowRouter.current().params.language;
      const myLanguage = Meteor.user().profile.language;

      if (language != myLanguage) {
        FlowRouter.withReplaceState(() => {
          FlowRouter.setParams({ language: myLanguage });
        });
      }

      if (TAPi18n.getLanguage() != myLanguage) {
        TAPi18n.setLanguage(myLanguage);
        moment.locale(myLanguage);
      }
    }
  },
  logout: () => {
    if (Meteor.loggingIn() || Meteor.userId()) {
      Delay(() => {
        Meteor.logout();
      });
    }
  },
  doIfLoggedIn: (whatToDo, elseToDo) => {
    const route = FlowRouter.getRouteName();

    Tracker.autorun((tracker) => {
      if (route != FlowRouter.getRouteName()) {
        tracker.stop();
      }
      else if (Meteor.userId()) {
        whatToDo();
      }
      else if (elseToDo != null) {
        elseToDo();
      } else {
        BlazeLayout.render('blankLayout', { content: 'login' });
      }
    });
  }
};

export default Helpers;
