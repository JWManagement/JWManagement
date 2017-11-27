import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.update.tpl.jade';

import '/imports/ui/UpdateForm/UpdateForm.js';

Template['vessel.update'].helpers({
    data: () => {
        return {
            db: Vessels,
            fields: [
                {
                    key: 'name'
                }, {
                    key: 'flag'
                }, {
                    key: 'type',
                    dropdown: 'vesselType'
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
