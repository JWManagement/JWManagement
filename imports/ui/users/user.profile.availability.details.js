Template['user.profile.availability.details'].helpers({
    data() {
        const params = FlowRouter.current().params;

        return {
            getMethod: 'user.profile.availability.get',
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
                            method: 'user.profile.availability.delete'
                        }
                    }]
                }],
                actions: [{
                    key: 'new',
                    type: 'link',
                    style: 'primary',
                    route: 'user.profile.availability.insert'
                }]
            }]
        }
    }
});
