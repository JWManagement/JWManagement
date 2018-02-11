import { Vessels } from '/imports/api/vessels/vessels.js';

Template['vessel.details'].helpers({
    data() {
        return {
            getMethod: 'vessel.get',
            backLink: 'vessel.search',
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
                                    link: 'vessel.visit.details',
                                    type: [
                                        {
                                            key: 'date',
                                            type: 'date'
                                        }, {
                                            key: 'dateNext',
                                            type: 'date'
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
                            style: 'primary',
                            route: 'vessel.visit.insert'
                        }
                    ]
                }
            ]
        }
    }
});
