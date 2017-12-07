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
                    key: 'harborId',
                    type: 'dropdown',
                    allowedKeyValuesMethod: 'vessel.visit.getAvailableHarbors'
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
