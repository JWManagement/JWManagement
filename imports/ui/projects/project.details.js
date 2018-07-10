import Permissions from '/imports/api/util/Permissions.js';

Template['project.details'].helpers({
    data: {
        getMethod: 'project.get',
        navigation: {
            backLink: 'dashboard.details',
            navbarStyle: 'flat',
            hideTitle: true
        },
        sections: [{
            type: 'header',
            title: 'name',
            description: 'news_text'
        }, {
            title: 'modules',
            contents: [{
                key: 'calendar',
                type: 'link',
                route: 'calendar',
                canSee: Permissions.member
            }, {
                key: 'shifts',
                type: 'link',
                route: 'shifts',
                canSee: Permissions.member
            }, {
                key: 'knowledgeBase',
                type: 'link',
                route: 'wiki',
                canSee: Permissions.member
            }, {
                key: 'vessels',
                type: 'link',
                route: 'vessel.search',
                canSee: Permissions.member,
                custom: (project) => {
                    return project.vesselModule == true;
                }
            }]
        }, {
            title: 'administration',
            contents: [{
                key: 'settings',
                type: 'link',
                route: 'settings',
                canSee: Permissions.shiftAdmin
            }, {
                key: 'publishers',
                type: 'link',
                route: 'publisher.search',
                canSee: Permissions.admin
            }, {
                key: 'reports',
                type: 'link',
                route: 'reports',
                canSee: Permissions.shiftAndStoreAdmin
            }, {
                key: 'store',
                type: 'link',
                route: 'store',
                canSee: Permissions.storeAdmin
            }, {
                key: 'notes',
                type: 'link',
                route: 'note.details',
                canSee: Permissions.shiftAndStoreAdmin
            }]
        }]
    }
});
