import Hour from '/imports/api/dropdowns/hour.js';

Template['user.profile.availability.insert'].helpers({
    data() {
        return {
            backLink: 'user.profile.availability.details',
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
