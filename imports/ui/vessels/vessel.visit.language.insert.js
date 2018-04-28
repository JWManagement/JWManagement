import Vessels from '/imports/api/vessels/Vessels.js';
import GetLanguages from '/imports/api/util/GetLanguages.js';

Template['vessel.visit.language.insert'].helpers({
    data() {
        return {
            backLink: 'vessel.visit.details',
            fields: [{
                key: 'languageIds',
                type: 'dropdown',
                allowedKeyValues: GetLanguages().map((lang) => {
                    return { key: lang, value: TAPi18n.__('language._' + lang) }
                })
            }]
        }
    }
});
