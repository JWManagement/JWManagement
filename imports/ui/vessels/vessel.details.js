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
                        key: 'visit',
                        fields: [{
                            key: 'person',
                            readonly: true,
                            overview: true
                        }, {
                            key: 'harbor',
                            readonly: true,
                            overview: true
                        }, {
                            key: 'harborGroup',
                            readonly: true,
                            overview: true
                        }, {
                            key: 'country',
                            readonly: true,
                            overview: true
                        }, {
                            key: 'date',
                            readonly: true,
                            overview: true,
                            type: Date
                        }, {
                            key: 'dateNext',
                            readonly: true,
                            overview: true,
                            type: Date
                        }, {
                            key: 'languages',
                            readonly: true,
                            overview: true
                        }]
                    }]
                }]
            }]
        }
    }
});
