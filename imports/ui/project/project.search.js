Template['project.search'].helpers({
    data() {
        return {
            entityId: 'projectId',
            backLink: 'dashboard',
            columns: [{
                name: '_id',
                visible: false
            }, {
                name: 'name',
                mobile: true
            }],
            searchCriteria: (search, projectId) => {
                return {
                    selector: {
                        $or: [{
                            _id: search
                        }, {
                            name: search
                        }]
                    },
                    options: {
                        sort: {
                            name: 1
                        }
                    }
                };
            }
        };
    }
});
