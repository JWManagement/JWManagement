import { Template } from 'meteor/templating'

Template['vessel.visit.update'].helpers({
  data: {
    getMethod: 'vessel.visit.getField',
    backLink: 'vessel.visit.details',
    fields: [{
      key: 'isUserVisible',
      type: 'checkbox'
    }, {
      key: 'date',
      type: 'date',
      format: 'YYYYMMDD'
    }, {
      key: 'harborId',
      type: 'picker',
      allowedKeyValuesMethod: 'vessel.visit.getAvailableHarbors',
      search: true
    }, {
      key: 'languages'
    }, {
      key: 'dateNext',
      type: 'date',
      format: 'YYYYMMDD'
    }]
  }
})
