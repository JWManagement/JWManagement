import Users from '/imports/api/users/Users.js';

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
