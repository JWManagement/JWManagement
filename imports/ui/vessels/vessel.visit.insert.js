import { Vessels } from '/imports/api/vessels/vessels.coffee';

const harborIds = ['1234', 'a', 'b']

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
                    key: 'harbor',
                    type: 'dropdown',
                    allowedValues: harborIds
                }, {
                    key: 'languages'
                }, {
                    key: 'dateNext',
                    type: 'date'
                }
            ]
        }
    }
});
