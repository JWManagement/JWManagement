import Hour from '/imports/api/dropdowns/Hour.js';

Template['user.profile.availability.insert'].helpers({
    data() {
        return {
            backLink: 'user.profile.availability.details',
            entityKey: 'availabilityId',
            fields: [{
                key: 'start',
                type: 'picker',
                allowedValues: Hour.allowedValues,
                defaultValue: Hour.defaultValue,
                required: true
            }, {
                key: 'end',
                type: 'picker',
                allowedValues: Hour.allowedValues,
                defaultValue: Hour.defaultValue,
                required: true
            }]
        }
    }
});
