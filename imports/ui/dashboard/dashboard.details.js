import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
    data() {
        return {
            getMethod: 'dashboard.get',
            backLink: 'home',
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
                contents: []
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
