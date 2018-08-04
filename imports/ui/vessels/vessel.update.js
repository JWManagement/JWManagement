import VesselType from '/imports/api/dropdowns/VesselType.js';

Template['vessel.update'].helpers({
  data: {
    getMethod: 'vessel.getField',
    backLink: 'vessel.details',
    fields: [{
      key: 'name'
    }, {
      key: 'flag'
    }, {
      key: 'type',
      type: 'picker',
      allowedValues: VesselType.allowedValues
    }, {
      key: 'callsign'
    }, {
      key: 'eni'
    }, {
      key: 'imo'
    }, {
      key: 'mmsi'
    }]
  }
});
