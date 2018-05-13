import Permissions from '/imports/api/util/Permissions.js';

Template['project.details'].helpers({
    data() {
        return {
            getMethod: 'project.get',
            backLink: 'dashboard',
            sections: [{
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
                    key: 'vessels',
                    link: 'vessel.search',
                    canSee: Permissions.member,
                    custom: (project) => {
                        return project.vesselModule == true;
                    }
                }, {
                    key: 'notes',
                    link: 'note.details',
                    canSee: Permissions.shiftAndStoreAdmin
                }]
            }]
        }
    }
});
