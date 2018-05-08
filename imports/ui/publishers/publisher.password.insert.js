import Users from '/imports/api/users/Users.js';

Template['publisher.password.insert'].helpers({
    data() {
        return {
            backLink: 'publisher.details',
            entityKey: 'userId',
            fields: [
                {
                    key: 'password',
                    type: 'password',
                    required: true
                }, {
                    key: 'passwordRepeat',
                    type: 'password',
                    required: true
                }
            ]
        }
    }
});
