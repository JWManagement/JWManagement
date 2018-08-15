import { Template } from 'meteor/templating';

import VesselType from '/imports/framework/Constants/VesselType';

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
