import Hour from '/imports/api/dropdowns/hour.js';

Template['user.availability.insert'].helpers({
    data() {
        return {
            backLink: 'user.availability.details',
            entityKey: 'availabilityId',
            fields: [{
                key: 'start',
                type: 'dropdown',
                allowedValues: Hour.allowedValues
            }, {
                key: 'end',
                type: 'dropdown',
                allowedValues: Hour.allowedValues
            }]
        }
    }
});
