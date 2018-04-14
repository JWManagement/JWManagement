Template['user.insert'].helpers({
    data() {
        return {
            backLink: 'user.search',
            entityKey: 'userId',
            fields: [{
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
                type: 'dropdown'
            }, {
                key: 'profile_bdate',
                type: 'date',
            }, {
                key: 'profile_pioneer',
                type: 'dropdown'
            }, {
                key: 'profile_privilege',
                type: 'dropdown'
            }, {
                key: 'profile_languages'
            }]
        }
    }
});
