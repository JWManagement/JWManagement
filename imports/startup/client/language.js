Meteor.startup(() => {
    Meteor.autorun((tracker) => {
        if (Meteor.user() != null) {
            tracker.stop();

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
    });
});
