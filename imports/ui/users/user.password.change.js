import Users from '/imports/api/users/users.js';

Template['user.password.change'].helpers({
    data() {
        return {
            backLink: 'user.details',
            saveLink: 'user.details',
            entityKey: 'userId',
            fields: [
                {
                    key: 'password'
                }, {
                    key: 'passwordRepeat'
                }
            ]
        }
    }
});
