import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.details.tpl.jade';

import '/imports/ui/DetailsForm/DetailsForm.js';

Template['vessel.details'].helpers({
    data() {
        return {
            db: Vessels,
            sections: [
                {
                    header: 'identificationSection',
                    contents: [
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
                }, {
                    header: 'visitSection',
                    contents: [
                        {
                            key: 'visits',
                            type: [
                                {
                                    key: 'visit',
                                    type: [
                                        {
                                            key: 'date',
                                            type: Date
                                        }, {
                                            key: 'dateNext',
                                            type: Date
                                        }, {
                                            key: 'languages'
                                        }, {
                                            key: 'person'
                                        }, {
                                            key: 'harbor'
                                        }, {
                                            key: 'harborGroup'
                                        }, {
                                            key: 'country'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    actions: [
                        {
                            key: 'visits.new',
                            type: 'link',
                            path: 'visits/new'
                        }
                    ]
                }
            ]
        }
    }
});
