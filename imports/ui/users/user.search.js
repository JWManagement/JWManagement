import { Users } from '/imports/api/users/users.js';

Template['user.search'].helpers({
    data() {
        return {
            db: Users,
            entityId: 'userId',
            entityLink: 'user.details',
            backLink: 'admin',
            getColumns: [
                {
                    name: '_id',
                    visible: false
                }, {
                    name: 'firstname',
                    mobile: true
                }, {
                    name: 'lastname',
                    mobile: true
                }, {
                    name: 'email',
                    mobile: true
                }
            ],
            searchCriteria: (search) => {
                return {
                    selector: {
                        $or: [
                            {
                                _id: search
                            }, {
                                'profile.lastname': search
                            }, {
                                'profile.firstname': search
                            }, {
                                'profile.email': search
                            }, {
                                telefon: search
                            }, {
                                username: search
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
