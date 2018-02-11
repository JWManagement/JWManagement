import Vessels from '/imports/api/vessels/vessels.js';

Template['vessel.visit.insert'].helpers({
    data() {
        return {
            backLink: 'vessel.details',
            saveLink: 'vessel.visit.details',
            entityKey: 'visitId',
            fields: [
                {
                    key: 'isUserVisible',
                    type: 'checkbox'
                }, {
                    key: 'date',
                    type: 'date',
                    default: 'today'
                }, {
                    key: 'harborId',
                    type: 'dropdown',
                    allowedKeyValuesMethod: 'vessel.visit.getAvailableHarbors'
                }, {
                    key: 'dateNext',
                    type: 'date'
                }
            ]
        }
    }
});
