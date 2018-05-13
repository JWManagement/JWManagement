import SystemLanguages from '/imports/api/dropdowns/SystemLanguages.js';

const Helpers = {

    checkLanguage: (c) => {
        if (Meteor.user() != null) {
            const language = FlowRouter.current().params.language;
            const myLanguage = Meteor.user().profile.language;

            console.log(language);
            console.log(myLanguage);

            if (language != myLanguage) {
                console.log('update url');
                FlowRouter.withReplaceState(() => {
                    FlowRouter.setParams({ language: myLanguage });
                });
            }

            if (TAPi18n.getLanguage() != myLanguage) {
                console.log('set tap language');
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

export default Helpers
