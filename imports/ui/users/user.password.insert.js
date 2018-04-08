import Users from '/imports/api/users/users.js';

Template['user.password.insert'].helpers({
    data() {
        return {
            backLink: 'user.details',
            entityKey: 'userId',
            fields: [
                {
                    key: 'password',
                    type: 'password'
                }, {
                    key: 'passwordRepeat',
                    type: 'password'
                }
            ]
        }
    }
});
