import Vessels from '/imports/api/vessels/vessels.js';
import VesselType from '/imports/api/dropdowns/vesselType.js';

Template['vessel.insert'].helpers({
    data() {
        return {
            backLink: 'vessel.search',
            saveLink: 'vessel.details',
            entityKey: 'vesselId',
            fields: [
                {
                    key: 'name'
                }, {
                    key: 'flag'
                }, {
                    key: 'type',
                    type: 'dropdown',
                    allowedValues: VesselType.allowedValues
                }, {
                    key: 'callsign'
                }, {
                    key: 'eni'
                }, {
                    key: 'imo'
                }, {
                    key: 'mmsi'
                }
            ]
        }
    }
});
