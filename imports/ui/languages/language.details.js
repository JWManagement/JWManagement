import Permissions from '/imports/api/util/Permissions.js';
import SystemLanguages from '/imports/api/dropdowns/SystemLanguages.js';

Template['language.details'].helpers({
    data: {
        getMethod: 'language.get',
        navigation: {
            backLink: 'dashboard.details'
        },
        sections: [{
            title: 'languages',
            contents: [{
                key: 'language',
                type: 'picker',
                allowedValues: SystemLanguages.allowedValues
            }]
        }]
    }
});
