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
                    type: 'date',
                    default: 'today'
                }, {
                    key: 'dateNext'
                }, {
                    key: 'languages'
                }
            ]
        }
    }
});
