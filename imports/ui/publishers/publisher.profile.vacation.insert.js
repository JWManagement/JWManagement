Template['publisher.profile.vacation.insert'].helpers({
    data() {
        return {
            backLink: 'publisher.details',
            entityKey: 'vacationId',
            fields: [{
                key: 'start',
                type: 'date',
                format: 'YYYYMMDD',
                required: true
            }, {
                key: 'end',
                type: 'date',
                format: 'YYYYMMDD',
                required: true
            }]
        }
    }
});
