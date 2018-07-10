import Vessels from '/imports/api/vessels/Vessels.js';
import Languages from '/imports/api/dropdowns/Languages.js';

Template['vessel.visit.language.insert'].helpers({
    dat: {
        backLink: 'vessel.visit.details',
        fields: [{
            key: 'languageIds',
            type: 'picker',
            allowedKeyValues: Languages.allowedValues
            .map((lang) => {
                return { key: lang, value: TAPi18n.__('language._' + lang) }
            })
            .sort((a, b) => {
                if(a.value < b.value) return -1;
                if(a.value > b.value) return 1;
                return 0;
            }),
            search: true,
            required: true
        }]
    }
});
