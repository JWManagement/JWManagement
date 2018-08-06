Template['vessel.details'].helpers({
  data: {
    getMethod: 'vessel.get',
    navigation: {
      backLink: 'vessel.search'
    },
    sections: [{
      title: 'identification',
      contents: [{
        key: 'name',
        type: 'text'
      }, {
        key: 'flag',
        type: 'text'
      }, {
        key: 'type',
        type: 'dropdown'
      }, {
        key: 'callsign',
        type: 'text'
      }, {
        key: 'eni',
        type: 'text'
      }, {
        key: 'imo',
        type: 'text'
      }, {
        key: 'mmsi',
        type: 'text'
      }]
    }, {
      title: 'visit',
      contents: [{
        key: 'visits',
        type: 'array',
        item: {
          key: 'visit',
          link: 'vessel.visit.details',
          type: 'entity',
          rows: [{
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'dateNext',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'languages',
            type: 'text'
          }, {
            key: 'person',
            type: 'text'
          }, {
            key: 'email',
            type: 'email'
          }, {
            key: 'phone',
            type: 'tel'
          }, {
            key: 'harbor',
            type: 'text'
          }, {
            key: 'country',
            type: 'text'
          }]
        }
      }],
      actions: [{
        key: 'visit.new',
        type: 'link',
        style: 'primary',
        route: 'vessel.visit.insert'
      }]
    }]
  }
});
