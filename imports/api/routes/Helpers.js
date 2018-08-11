import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import moment from 'moment';

const Helpers = {

  checkLanguage: () => {
    const language = FlowRouter.current().params.language;
    const myLanguage = TAPi18n.getLanguage();

    if (language != myLanguage) {
      TAPi18n.setLanguage(language);
      moment.locale(language);

      FlowRouter.withReplaceState(() => {
        FlowRouter.setParams({ language: language });
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
