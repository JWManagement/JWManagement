import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.details.tpl.jade';

import '/imports/ui/DetailsForm/DetailsForm.js';

Template['vessel.details'].helpers({
    data: () => {
        return {
            db: Vessels,
            sections: [{
                header: 'identificationSection',
                contents: [{
                    key: 'name'
                }, {
                    key: 'flag'
                }, {
                    key: 'type',
                    dropdownContainer: 'types'
                }, {
                    key: 'callsign'
                }, {
                    key: 'eni'
                }, {
                    key: 'imo'
                }, {
                    key: 'mmsi'
                }],
            }, {
                header: 'visitSection',
                contents: [{
                    key: 'lastVisit',
                    type: 'date'
                }, {
                    key: 'nextVisit',
                    type: 'date'
                }]
            }]
        }
    }
});
