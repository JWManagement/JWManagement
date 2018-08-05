import VesselType from '/imports/api/dropdowns/VesselType.js';

Template['vessel.insert'].helpers({
  data: {
    backLink: 'vessel.search',
    entityKey: 'vesselId',
    fields: [{
      key: 'name',
      required: true
    }, {
      key: 'flag'
    }, {
      key: 'type',
      type: 'picker',
      allowedValues: VesselType.allowedValues,
      defaultValue: VesselType.defaultValue,
      required: true
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
