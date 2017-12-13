import { Vessels } from '/imports/api/vessels/vessels.coffee';
import getLanguages from '/imports/api/util/languages.js';

Template['vessel.visit.language.insert'].helpers({
    data() {
        return {
            backLink: 'vessel.visit.details',
            fields: [
                {
                    key: 'languageId',
                    type: 'dropdown',
                    allowedKeyValues: getLanguages().map((lang) => {
                        return { key: lang, value: TAPi18n.__('language._' + lang) }
                    })
                }
            ]
        }
    }
});
