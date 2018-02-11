const Helpers = {

    checkLanguage: (c) => {
        let language = c.params.language;
        let languages = Object.keys(TAPi18n.getLanguages());

        if ((language != null) && (languages.indexOf(language) >= 0)) {
            TAPi18n.setLanguage(language);
            moment.locale(language);

            if (Meteor.user()) {
                Delay(() => {
                    Meteor.call('updateProfile', 'language', language);
                });
            }
            return language;
        } else if (navigator.language.indexOf('de') > -1) {
            wrs(() => {
                FlowRouter.setParams({ language: 'de' });
            });
            return 'de';
        } else {
            wrs(() => {
                FlowRouter.setParams({ language: 'en' });
            });
            return 'en';
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
