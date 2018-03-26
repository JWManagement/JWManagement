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
                        key: 'timeslot',
                        type: 'delete',
                        click: {
                            type: 'delete',
                            method: 'user.availability.delete'
                        }
                    }]
                }],
                actions: [{
                    key: 'timeslot.new',
                    type: 'link',
                    style: 'primary',
                    route: 'user.availability.insert'
                }]
            }]
        }
    }
});
