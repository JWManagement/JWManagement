Template['vessel.visit.insert'].helpers({
  data: {
    backLink: 'vessel.details',
    entityKey: 'visitId',
    fields: [{
      key: 'isUserVisible',
      type: 'checkbox'
    }, {
      key: 'date',
      type: 'date',
      default: 'today',
      format: 'YYYYMMDD',
      required: true
    }, {
      key: 'harborId',
      type: 'picker',
      allowedKeyValuesMethod: 'vessel.visit.getAvailableHarbors',
      required: true
    }, {
      key: 'dateNext',
      type: 'date',
      format: 'YYYYMMDD'
    }]
  }
});
