import Users from '/imports/api/users/users.js';

Template['user.details'].helpers({
    data() {
        return {
            getMethod: 'user.get',
            backLink: 'user.search',
            sections: [
                {
                    header: 'identification',
                    contents: [
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
                            type: 'dropdown'
                        }, {
                            key: 'profile_bdate',
                            type: 'date'
                        }, {
                            key: 'profile_pioneer',
                            type: 'dropdown'
                        }, {
                            key: 'profile_privilege',
                            type: 'dropdown'
                        }, {
                            key: 'profile_languages'
                        }
                    ],
                    actions: [
                        {
                            key: 'password.change',
                            type: 'link',
                            style: 'primary',
                            route: 'user.password.insert'
                        }, {
                            key: 'delete',
                            type: 'confirm',
                            style: 'danger',
                            method: 'user.removeFromProject',
                            route: 'user.search'
                        }
                    ]
                }
            ]
        }
    }
});
