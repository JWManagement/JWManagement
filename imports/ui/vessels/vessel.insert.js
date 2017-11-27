import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.insert.tpl.jade';

import '/imports/ui/InsertForm/InsertForm.js';

Template['vessel.insert'].helpers({
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
