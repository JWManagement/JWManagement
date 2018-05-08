import Permissions from '/imports/api/util/Permissions.js';

Template['dashboard.details'].helpers({
    data() {
        return {
            getMethod: 'dashboard.get',
            backLink: 'home',
            sections: [
                {
                    header: 'projects',
                    contents: []
                }, {
                    header: 'shifts',
                    contents: []
                }, {
                    header: 'administration',
                    contents: [
                        {
                            key: 'enquiries',
                            link: 'enquiries',
                            canSee: Permissions.support
                        }, {
                            key: 'projects',
                            link: 'projects',
                            canSee: Permissions.support
                        }, {
                            key: 'users',
                            link: 'users',
                            canSee: Permissions.support
                        }
                    ]
                }
            ]
        }
    }
});
