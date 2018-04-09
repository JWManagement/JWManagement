import Vessels from '/imports/api/vessels/Vessels.js';

Template['vessel.search'].helpers({
    data() {
        return {
            db: Vessels,
            entityId: 'vesselId',
            backLink: 'admin.details',
            allowCreate: true,
            columns: [{
                name: '_id',
                visible: false
            }, {
                name: 'name',
                mobile: true
            }, {
                name: 'flag',
                mobile: true
            }, {
                name: 'type',
                type: 'dropdown',
                mobile: true
            }, {
                name: 'callsign',
                mobile: true
            }, {
                name: 'eni'
            }, {
                name: 'imo'
            }, {
                name: 'mmsi'
            }],
            searchCriteria: (search, projectId) => {
                return {
                    selector: {
                        $or: [{
                            _id: search
                        }, {
                            name: search
                        }, {
                            callsign: search
                        }, {
                            eni: search
                        }, {
                            imo: search
                        }, {
                            mmsi: search
                        }]
                    },
                    options: {
                        sort: {
                            name: 1,
                            callsign: 1
                        }
                    }
                };
            }
        };
    }
});
