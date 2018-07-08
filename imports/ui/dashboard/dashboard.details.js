import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
    data() {
        return {
            getMethod: 'dashboard.get',
            navigation: {},
            sections: [{
                header: 'myProjects',
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
                header: 'missingShiftReports',
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
                header: 'upcomingShifts',
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
                header: 'pendingRequests',
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
                header: 'olderShifts',
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
                header: 'administration',
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
                header: 'account',
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
