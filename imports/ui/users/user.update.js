import Users from '/imports/api/users/users.js';
import Gender from '/imports/api/dropdowns/gender.js';
import Pioneer from '/imports/api/dropdowns/pioneer.js';
import Privilege from '/imports/api/dropdowns/privilege.js';

Template['user.update'].helpers({
    data() {
        return {
            getMethod: 'user.getField',
            backLink: 'user.details',
            fields: [
                {
                    key: 'profile_firstname'
                }, {
                    key: 'profile_lastname'
                }, {
                    key: 'profile_email'
                }, {
                    key: 'profile_telefon'
                }, {
                    key: 'username'
                }, {
                    key: 'profile_gender',
                    type: 'dropdown',
                    allowedValues: Gender.allowedValues
                }, {
                    key: 'profile_bdate',
                    type: 'date'
                }, {
                    key: 'profile_pioneer',
                    type: 'dropdown',
                    allowedValues: Pioneer.allowedValues
                }, {
                    key: 'profile_privilege',
                    type: 'dropdown',
                    allowedValues: Privilege.allowedValues
                }, {
                    key: 'profile_languages'
                }
            ]
        }
    }
});
