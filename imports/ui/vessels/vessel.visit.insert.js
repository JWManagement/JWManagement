import { Vessels } from '/imports/api/vessels/vessels.coffee';

Template['vessel.visit.insert'].helpers({
    data() {
        return {
            db: Vessels,
            fields: [
                {
                    key: 'isUserVisible',
                    type: 'checkbox',
                    required: true
                }, {
                    key: 'date',
                    type: Date
                }, {
                    key: 'dateNext'
                }, {
                    key: 'languages'
                }
            ]
        }
    }
});
