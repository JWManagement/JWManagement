import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
    data() {
        return {
            getMethod: 'dashboard.get',
            backLink: '',
            sections: [{
                header: 'projects',
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
                header: 'shifts',
                contents: [{
                    key: 'shifts',
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
                    key: 'shifts',
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
                    key: 'projects',
                    link: 'project.search',
                    canSee: Permissions.support
                }, {
                    key: 'users',
                    link: 'user.search',
                    canSee: Permissions.support
                }]
            }]
        }
    }
});
