import Vessels from '/imports/api/vessels/vessels.js';

Template['vessel.update'].helpers({
    data() {
        return {
            getMethod: 'vessel.getField',
            backLink: 'vessel.details',
            fields: [
                {
                    key: 'name'
                }, {
                    key: 'flag'
                }, {
                    key: 'type',
                    type: 'dropdown',
                    allowedValues: ['c', 'cr', 'mf', 'mt', 'p', 'pt', 'rc', 'f', 'ro', 't', 'unknown']
                }, {
                    key: 'callsign'
                }, {
                    key: 'eni'
                }, {
                    key: 'imo'
                }, {
                    key: 'mmsi'
                }
            ]
        }
    }
});
