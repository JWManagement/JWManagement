import { Vessels } from '/imports/api/vessels/vessels.coffee';

Template['vessel.visit.update'].helpers({
    data() {
        return {
            getMethod: 'vessel.visit.getField',
            backLink: 'vessel.visit.details',
            fields: [
                {
                    key: 'isUserVisible',
                    type: 'checkbox'
                }, {
                    key: 'date',
                    type: 'date'
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
