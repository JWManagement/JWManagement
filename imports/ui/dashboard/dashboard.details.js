import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
    data() {
        return {
            getMethod: 'dashboard.get',
            navigation: {},
            sections: [{
                title: 'myProjects',
                contents: [{
                    key: 'myProjects',
                    icon: 'group',
                    type: [{
                        key: 'project',
                        click: {
                            type: 'link',
                            link: 'project.details'
                        }
                    }]
                }]
            }, {
                title: 'missingShiftReports',
                contents: [{
                    key: 'missingShiftReports',
                    icon: 'announcement',
                    type: [{
                        key: 'shift',
                        link: 'shift.details',
                        type: [{
                            key: 'tag'
                        }, {
                            key: 'date',
                            type: 'date',
                            dbFormat: 'YYYYMMDD',
                            uiFormat: 'date'
                        }, {
                            key: 'start',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }, {
                            key: 'end',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }]
                    }]
                }]
            }, {
                title: 'upcomingShifts',
                contents: [{
                    key: 'upcomingShifts',
                    icon: 'event_available',
                    type: [{
                        key: 'shift',
                        link: 'shift.details',
                        type: [{
                            key: 'tag'
                        }, {
                            key: 'date',
                            type: 'date',
                            dbFormat: 'YYYYMMDD',
                            uiFormat: 'date'
                        }, {
                            key: 'start',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }, {
                            key: 'end',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }]
                    }]
                }]
            }, {
                title: 'pendingRequests',
                contents: [{
                    key: 'pendingRequests',
                    icon: 'hourglass_empty',
                    type: [{
                        key: 'shift',
                        link: 'shift.details',
                        type: [{
                            key: 'tag'
                        }, {
                            key: 'date',
                            type: 'date',
                            dbFormat: 'YYYYMMDD',
                            uiFormat: 'date'
                        }, {
                            key: 'start',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }, {
                            key: 'end',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }]
                    }]
                }]
            }, {
                title: 'olderShifts',
                contents: [{
                    key: 'olderShifts',
                    icon: 'event_available',
                    type: [{
                        key: 'shift',
                        link: 'shift.details',
                        type: [{
                            key: 'tag'
                        }, {
                            key: 'date',
                            type: 'date',
                            dbFormat: 'YYYYMMDD',
                            uiFormat: 'date'
                        }, {
                            key: 'start',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }, {
                            key: 'end',
                            type: 'time',
                            dbFormat: 'Hmm',
                            uiFormat: 'time'
                        }]
                    }]
                }]
            }, {
                title: 'administration',
                contents: [{
                    key: 'profile',
                    icon: 'account_circle',
                    link: 'profile'
                }, {
                    key: 'language',
                    icon: 'translate',
                    link: 'language.details'
                }, {
                    key: 'projects',
                    icon: 'view_module',
                    link: 'project.search',
                    canSee: Permissions.support
                }, {
                    key: 'users',
                    icon: 'group',
                    link: 'user.search',
                    canSee: Permissions.support
                }]
            }, {
                title: 'account',
                contents: [{
                    key: 'oldDashboard',
                    icon: 'dashboard',
                    link: 'home',
                    canSee: Permissions.admin
                }, {
                    key: 'logout',
                    icon: 'power_settings_new',
                    link: 'logout'
                }]
            }]
        }
    }
});
