import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
    data() {
        return {
            getMethod: 'dashboard.get',
            backLink: '',
            sections: [{
                header: 'myProjects',
                contents: [{
                    key: 'myProjects',
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
                    link: 'profile'
                }, {
                    key: 'language',
                    link: 'language.details'
                }, {
                    key: 'projects',
                    link: 'project.search',
                    canSee: Permissions.support
                }, {
                    key: 'users',
                    link: 'user.search',
                    canSee: Permissions.support
                }]
            }, {
                header: 'account',
                contents: [{
                    key: 'oldDashboard',
                    link: 'home',
                    canSee: Permissions.admin
                }, {
                    key: 'logout',
                    link: 'logout'
                }]
            }]
        }
    }
});
