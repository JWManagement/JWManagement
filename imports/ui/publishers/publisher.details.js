import Users from '/imports/api/users/Users.js';

Template['publisher.details'].helpers({
    data: {
        getMethod: 'publisher.get',
        navigation: {
            backLink: 'publisher.search'
        },
        sections: [{
            title: 'identification',
            contents: [{
                key: 'profile_firstname',
                type: 'text'
            }, {
                key: 'profile_lastname',
                type: 'text'
            }, {
                key: 'profile_email',
                type: 'text'
            }, {
                key: 'profile_telefon',
                type: 'text'
            }, {
                key: 'username',
                type: 'text'
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
                key: 'profile_languages',
                type: 'text'
            }]
        }, {
            title: 'availability',
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
            title: 'vacations',
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
            title: 'permissions',
            contents: [{
                key: 'permissions_project',
                type: 'text'
            }, {
                key: 'permissions_tags',
                type: [{
                    key: 'tag',
                    type: 'keyValue',
                    link: 'publisher.permission.details'
                }]
            }]
        }, {
            title: 'password',
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
            title: 'options',
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
});
