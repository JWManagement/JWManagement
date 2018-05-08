Template['publisher.profile.availability.details'].helpers({
    data() {
        const params = FlowRouter.current().params;

        return {
            getMethod: 'publisher.profile.availability.get',
            backLink: 'publisher.details',
            sections: [{
                header: params.key.split('_').pop(),
                contents: [{
                    key: 'availability',
                    type: [{
                        key: 'timeslot',
                        type: 'delete',
                        click: {
                            type: 'delete',
                            method: 'publisher.profile.availability.delete'
                        }
                    }]
                }],
                actions: [{
                    key: 'new',
                    type: 'link',
                    style: 'primary',
                    route: 'publisher.profile.availability.insert'
                }]
            }]
        }
    }
});
