import { Vessels } from '/imports/api/vessels/vessels.coffee';

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
                            type: 'dropdown'
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
                                            key: 'email',
                                            type: 'email'
                                        }, {
                                            key: 'phone',
                                            type: 'tel'
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
                            key: 'visit.new',
                            type: 'link',
                            path: 'visit/new'
                        }
                    ]
                }
            ]
        }
    }
});
