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
                    dropdown: 'vesselType'
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
                    key: 'visits',
                    type: [{
                        key: 'person',
                        readonly: true
                    }, {
                        key: 'harbor',
                        readonly: true
                    }, {
                        key: 'harborGroup',
                        readonly: true
                    }, {
                        key: 'country',
                        readonly: true
                    }, {
                        key: 'date',
                        readonly: true,
                        type: Date
                    }, {
                        key: 'dateNext',
                        readonly: true,
                        type: Date
                    }, {
                        key: 'languages',
                        readonly: true
                    }]
                }]
            }]
        }
    }
});
