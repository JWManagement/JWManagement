import { Vessels } from '/imports/api/vessels/vessels.coffee';

Template['vessel.details'].helpers({
    data() {
        return {
            db: Vessels,
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
