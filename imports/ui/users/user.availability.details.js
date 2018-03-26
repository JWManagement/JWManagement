Template['user.availability.details'].helpers({
    data() {
        const params = FlowRouter.current().params;

        return {
            getMethod: 'user.availability.get',
            backLink: 'user.details',
            sections: [{
                header: params.key.split('_').pop(),
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
