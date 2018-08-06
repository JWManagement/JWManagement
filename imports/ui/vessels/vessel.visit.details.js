import Languages from '/imports/api/dropdowns/Languages';

Template['vessel.visit.details'].helpers({
  data: {
    getMethod: 'vessel.visit.getLast',
    navigation: {
      backLink: 'vessel.details'
    },
    sections: [{
      title: 'main',
      contents: [{
        key: 'date',
        type: 'date',
        dbFormat: 'YYYYMMDD',
        uiFormat: 'date',
        canUpdate: 'author'
      }, {
        key: 'person',
        type: 'text',
        linkedKey: 'isUserVisible',
        canUpdate: 'author'
      }, {
        key: 'email',
        type: 'email',
        readonly: true
      }, {
        key: 'phone',
        type: 'phone',
        readonly: true
      }, {
        key: 'harbor',
        type: 'text',
        linkedKey: 'harborId',
        canUpdate: 'author'
      }, {
        key: 'country',
        type: 'text',
        readonly: true
      }, {
        key: 'dateNext',
        type: 'date',
        dbFormat: 'YYYYMMDD',
        uiFormat: 'date',
        canUpdate: 'author'
      }]
    }, {
      title: 'language',
      contents: [{
        key: 'languageIds',
        type: 'array',
        item: {
          key: 'languageId',
          type: 'dropdown',
          allowedValues: Languages.allowedValues,
          action: {
            type: 'method',
            icon: 'trash',
            method: 'vessel.visit.language.delete',
            canDo: 'author'
          }
        }
      }],
      actions: [{
        key: 'language.new',
        type: 'link',
        style: 'primary',
        route: 'vessel.visit.language.insert',
        canSee: 'author'
      }]
    }, {
      title: 'option',
      actions: [{
        key: 'delete',
        type: 'confirm',
        style: 'danger',
        method: 'vessel.visit.delete',
        route: 'vessel.details',
        canSee: 'author'
      }]
    }]
  }
});
