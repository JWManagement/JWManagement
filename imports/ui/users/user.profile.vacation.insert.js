Template['user.profile.vacation.insert'].helpers({
    data() {
        return {
            backLink: 'user.details',
            entityKey: 'vacationId',
            fields: [{
                key: 'start',
                type: 'date'
            }, {
                key: 'end',
                type: 'date'
            }]
        }
    }
});
