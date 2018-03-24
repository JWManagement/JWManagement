import Users from '/imports/api/users/users.js';

Template['user.search'].helpers({
    data() {
        return {
            db: Users,
            entityId: 'userId',
            backLink: 'admin.details',
            allowCreate: true,
            columns: [
                {
                    name: '_id',
                    visible: false
                }, {
                    name: 'profile_firstname',
                    mobile: true
                }, {
                    name: 'profile_lastname',
                    mobile: true
                }, {
                    name: 'profile_email',
                    mobile: true
                }, {
                    name: 'profile_telefon',
                    mobile: true
                }, {
                    name: 'username',
                    mobile: true
                }
            ],
            searchCriteria: (search, projectId) => {
                return {
                    selector: {
                        $and: [
                            {
                                $or: [
                                    { _id: search },
                                    { 'profile.lastname': search },
                                    { 'profile.firstname': search },
                                    { 'profile.email': search },
                                    { 'profile.telefon': search },
                                    { username: search }
                                ],
                            },
                            {
                                ['roles.' + projectId]: {
                                    $in: Permissions.member
                                }
                            },
                            {
                                username: {
                                    $ne: 'adm'
                                }
                            }
                        ]
                    },
                    options: {
                        sort: {
                            'profile.lastname': 1,
                            'profile.firstname': 1,
                            username: 1
                        }
                    }
                };
            }
        };
    }
});
