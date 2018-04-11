import Users from '/imports/api/users/Users.js';

Template['user.details'].helpers({
    data() {
        return {
            getMethod: 'user.get',
            backLink: 'user.search',
            sections: [{
                header: 'identification',
                contents: [{
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
                    format: 'DD.MM.YYYY'
                }, {
                    key: 'profile_pioneer',
                    type: 'dropdown'
                }, {
                    key: 'profile_privilege',
                    type: 'dropdown'
                }, {
                    key: 'profile_languages'
                }]
            }, {
                header: 'availability',
                contents: [{
                    key: 'profile_availability_mondays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_availability_tuesdays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_availability_wednesdays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_availability_thursdays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_availability_fridays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_availability_saturdays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_availability_sundays',
                    link: 'user.profile.availability.details'
                }, {
                    key: 'profile_shortTermCalls',
                    type: 'checkbox'
                }, {
                    key: 'profile_shortTermCallsAlways',
                    type: 'checkbox'
                }]
            }, {
                header: 'vacations',
                contents: [{
                    key: 'profile_vacations',
                    type: [{
                        key: 'display',
                        type: 'delete',
                        click: {
                            type: 'delete',
                            method: 'user.profile.vacation.delete'
                        }
                    }]
                }],
                actions: [{
                    key: 'profile.vacation.new',
                    type: 'link',
                    style: 'primary',
                    route: 'user.profile.vacation.insert'
                }]
            }, {
                header: 'password',
                contents: [],
                actions: [{
                    key: 'password.change',
                    type: 'link',
                    style: 'primary',
                    route: 'user.password.insert'
                }, {
                    key: 'password.reset',
                    type: 'confirm',
                    style: 'primary',
                    method: 'user.password.reset'
                }]
            }, {
                header: 'options',
                contents: [],
                actions: [{
                    key: 'invite',
                    type: 'confirm',
                    style: 'primary',
                    method: 'user.invite'
                }, {
                    key: 'delete',
                    type: 'confirm',
                    style: 'danger',
                    method: 'user.removeFromProject',
                    route: 'user.search'
                }]
            }]
        }
    }
});
