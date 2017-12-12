import { Vessels } from '/imports/api/vessels/vessels.coffee';

Template['vessel.insert'].helpers({
    data() {
        return {
            backLink: 'vessel.search',
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
