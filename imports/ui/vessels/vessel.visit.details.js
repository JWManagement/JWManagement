import { Vessels } from '/imports/api/vessels/vessels.coffee';

Template['vessel.visit.details'].helpers({
    data() {
        return {
            getMethod: 'vessel.visit.getLast',
            backLink: 'vessel.details',
            sections: [
                {
                    header: 'mainSection',
                    contents: [
                        {
                            key: 'date',
                            type: 'date'
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
                        }, {
                            key: 'languages'
                        }, {
                            key: 'dateNext',
                            type: 'date'
                        }
                    ]
                }
            ]
        }
    }
});
