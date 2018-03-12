import Permissions from '/imports/api/util/permissions.js';

Template['admin.details'].helpers({
    data() {
        return {
            getMethod: 'admin.get',
            backLink: 'home',
            sections: [
                {
                    header: 'administrationSection',
                    contents: [
                        {
                            key: 'settings',
                            link: 'settings',
                            canSee: Permissions.shiftAdmin
                        }, {
                            key: 'users',
                            link: 'users',
                            canSee: Permissions.admin
                        }, {
                            key: 'usersNew',
                            link: 'user.search',
                            canSee: Permissions.support
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
                            link: 'notes',
                            canSee: Permissions.shiftAndStoreAdmin
                        }, {
                            key: 'notesNew',
                            link: 'note.details',
                            canSee: Permissions.shiftAndStoreAdmin
                        }
                    ]
                }
            ]
        }
    }
});
