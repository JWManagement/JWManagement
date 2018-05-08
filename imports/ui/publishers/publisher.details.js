import Users from '/imports/api/users/Users.js';

Template['publisher.details'].helpers({
    data() {
        return {
            getMethod: 'publisher.get',
            backLink: 'publisher.search',
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
                    link: 'publisher.profile.availability.details'
                }, {
                    key: 'profile_availability_tuesdays',
                    link: 'publisher.profile.availability.details'
                }, {
                    key: 'profile_availability_wednesdays',
                    link: 'publisher.profile.availability.details'
                }, {
                    key: 'profile_availability_thursdays',
                    link: 'publisher.profile.availability.details'
                }, {
                    key: 'profile_availability_fridays',
                    link: 'publisher.profile.availability.details'
                }, {
                    key: 'profile_availability_saturdays',
                    link: 'publisher.profile.availability.details'
                }, {
                    key: 'profile_availability_sundays',
                    link: 'publisher.profile.availability.details'
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
                            method: 'publisher.profile.vacation.delete'
                        }
                    }]
                }],
                actions: [{
                    key: 'profile.vacation.new',
                    type: 'link',
                    style: 'primary',
                    route: 'publisher.profile.vacation.insert'
                }]
            }, {
                header: 'password',
                contents: [],
                actions: [{
                    key: 'password.change',
                    type: 'link',
                    style: 'primary',
                    route: 'publisher.password.insert'
                }, {
                    key: 'password.reset',
                    type: 'confirm',
                    style: 'primary',
                    method: 'publisher.password.reset'
                }]
            }, {
                header: 'options',
                contents: [],
                actions: [{
                    key: 'invite',
                    type: 'confirm',
                    style: 'primary',
                    method: 'publisher.invite'
                }, {
                    key: 'delete',
                    type: 'confirm',
                    style: 'danger',
                    method: 'publisher.removeFromProject',
                    route: 'publisher.search'
                }]
            }]
        }
    }
});
