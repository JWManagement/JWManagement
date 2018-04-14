import Vessels from '/imports/api/vessels/Vessels.js';

Template['vessel.visit.insert'].helpers({
    data() {
        return {
            backLink: 'vessel.details',
            entityKey: 'visitId',
            fields: [{
                key: 'isUserVisible',
                type: 'checkbox'
            }, {
                key: 'date',
                type: 'date',
                default: 'today',
                format: 'YYYYMMDD'
            }, {
                key: 'harborId',
                type: 'dropdown',
                allowedKeyValuesMethod: 'vessel.visit.getAvailableHarbors'
            }, {
                key: 'dateNext',
                type: 'date',
                format: 'YYYYMMDD'
            }]
        }
    }
});
