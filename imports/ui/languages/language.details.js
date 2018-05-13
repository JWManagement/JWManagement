import Permissions from '/imports/api/util/Permissions.js';
import SystemLanguages from '/imports/api/dropdowns/SystemLanguages.js';

Template['language.details'].helpers({
    data() {
        return {
            getMethod: 'language.get',
            backLink: 'dashboard.details',
            sections: [{
                header: 'languages',
                contents: [{
                    key: 'language',
                    type: 'picker',
                    allowedValues: SystemLanguages.allowedValues
                }]
            }]
        }
    }
});
