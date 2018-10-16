import { Template } from 'meteor/templating'

import VesselType from '../../framework/Constants/VesselType'

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
})
