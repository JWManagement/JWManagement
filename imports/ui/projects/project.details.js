import Permissions from '/imports/api/util/Permissions.js';

Template['project.details'].helpers({
    data() {
        return {
            getMethod: 'project.get',
            backLink: 'dashboard.details',
            navbarStyle: 'flat',
            showTitle: false,
            sections: [{
                background: 'indigo',
                contents: [{
                    key: 'name',
                    type: 'title'
                }, {
                    key: 'news_text',
                    type: 'description'
                }]
            }, {
                header: 'modules',
                contents: [{
                    key: 'calendar',
                    link: 'calendar',
                    canSee: Permissions.member
                }, {
                    key: 'shifts',
                    link: 'shifts',
                    canSee: Permissions.member
                }, {
                    key: 'knowledgeBase',
                    link: 'wiki',
                    canSee: Permissions.member
                }, {
                    key: 'vessels',
                    link: 'vessel.search',
                    canSee: Permissions.member,
                    custom: (project) => {
                        return project.vesselModule == true;
                    }
                }]
            }, {
                header: 'administration',
                contents: [{
                    key: 'settings',
                    link: 'settings',
                    canSee: Permissions.shiftAdmin
                }, {
                    key: 'publishers',
                    link: 'publisher.search',
                    canSee: Permissions.admin
                }, {
                    key: 'reports',
                    link: 'reports',
                    canSee: Permissions.shiftAndStoreAdmin
                }, {
                    key: 'store',
                    link: 'store',
                    canSee: Permissions.storeAdmin
                }, {
                    key: 'notes',
                    link: 'note.details',
                    canSee: Permissions.shiftAndStoreAdmin
                }]
            }]
        }
    }
});
