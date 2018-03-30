Template['user.availability.insert'].helpers({
    data() {
        return {
            backLink: 'user.availability.details',
            entityKey: 'availabilityId',
            fields: [{
                key: 'start'
            }, {
                key: 'end'
            }]
        }
    }
});
