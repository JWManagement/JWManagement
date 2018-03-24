Template['user.availability.details'].helpers({
    data() {
        return {
            getMethod: 'user.availability.get',
            backLink: 'user.details',
            sections: [{
                header: 'availabilities',
                contents: [{
                    key: 'availability',
                    type: [{
                        key: 'timeslot'
                    }]
                }]
            }]
        }
    }
});
