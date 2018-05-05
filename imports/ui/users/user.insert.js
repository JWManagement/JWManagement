import Gender from '/imports/api/dropdowns/Gender.js';
import Pioneer from '/imports/api/dropdowns/Pioneer.js';
import Privilege from '/imports/api/dropdowns/Privilege.js';

Template['user.insert'].helpers({
    data() {
        return {
            backLink: 'user.search',
            entityKey: 'userId',
            fields: [{
                key: 'profile_firstname',
                required: true
            }, {
                key: 'profile_lastname',
                required: true
            }, {
                key: 'profile_email',
                required: true
            }, {
                key: 'profile_telefon'
            }, {
                key: 'username',
                required: true
            }, {
                key: 'profile_gender',
                type: 'dropdown',
                allowedValues: Gender.allowedValues,
                defaultValue: 'm',
                required: true
            }, {
                key: 'profile_bdate',
                type: 'date',
                format: 'YYYYDDD'
            }, {
                key: 'profile_pioneer',
                type: 'dropdown',
                allowedValues: Pioneer.allowedValues,
                required: true
            }, {
                key: 'profile_privilege',
                type: 'dropdown',
                allowedValues: Privilege.allowedValues,
                required: true
            }, {
                key: 'profile_languages'
            }]
        }
    }
});
