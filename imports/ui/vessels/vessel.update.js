import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import '/imports/ui/UpdateForm/UpdateForm.js';

Template['vessel.update'].helpers({
    data() {
        return {
            db: Vessels,
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
