import Vessels from '/imports/api/vessels/Vessels.js';

Template['vessel.details'].helpers({
    data() {
        return {
            getMethod: 'vessel.get',
            navigation: {
                backLink: 'vessel.search'
            },
            sections: [{
                header: 'identification',
                contents: [{
                    key: 'name',
                    type: 'text'
                }, {
                    key: 'flag',
                    type: 'text'
                }, {
                    key: 'type',
                    type: 'dropdown'
                }, {
                    key: 'callsign',
                    type: 'text'
                }, {
                    key: 'eni',
                    type: 'text'
                }, {
                    key: 'imo',
                    type: 'text'
                }, {
                    key: 'mmsi',
                    type: 'text'
                }]
            }, {
                header: 'visit',
                contents: [{
                    key: 'visits',
                    type: [{
                        key: 'visit',
                        link: 'vessel.visit.details',
                        type: [{
                            key: 'date',
                            type: 'date',
                            dbFormat: 'YYYYMMDD',
                            uiFormat: 'date'
                        }, {
                            key: 'dateNext',
                            type: 'date',
                            dbFormat: 'YYYYMMDD',
                            uiFormat: 'date'
                        }, {
                            key: 'languages',
                            type: 'text'
                        }, {
                            key: 'person',
                            type: 'text'
                        }, {
                            key: 'email',
                            type: 'email'
                        }, {
                            key: 'phone',
                            type: 'tel'
                        }, {
                            key: 'harbor',
                            type: 'text'
                        }, {
                            key: 'harborGroup',
                            type: 'text'
                        }, {
                            key: 'country',
                            type: 'text'
                        }]
                    }]
                }],
                actions: [{
                    key: 'visit.new',
                    type: 'link',
                    style: 'primary',
                    route: 'vessel.visit.insert'
                }]
            }]
        }
    }
});
