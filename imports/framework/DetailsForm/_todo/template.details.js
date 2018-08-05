Template['template.details'].helpers({
  data: {
    getMethod: 'template.get',
    navigation: {
      backLink: 'dashboard.details', // OPTIONAL
      navbarStyle: 'flat', // OPTIONAL
      hideTitle: true // OPTIONAL
    },
    sections: [{
      key: 'myProjects',
      type: 'array',
      item: {
        key: 'project',
        type: 'link',
        icon: 'group',
        action: {
          type: 'route',
          route: 'project.details'
        }
      }
    }, {
      title: 'mySection', // OPTIONAL
      type: 'header', // OPTIONAL
      contents: [{
        key: 'firstname',
        type: 'text',
        linkedKey: 'profile_firstname', // OPTIONAL
        icon: 'group', // OPTIONAL
        readonly: true // OPTIONAL
      }, {
        key: 'description',
        type: 'textbox',
        linkedKey: 'news_text' // OPTIONAL
      }, {
        key: 'email',
        type: 'email',
        readonly: true // OPTIONAL
      }, {
        key: 'phone',
        type: 'phone',
        readonly: true // OPTIONAL
      }, {
        key: 'dashboard',
        type: 'link',
        route: 'dashboard.details',
        linkedKey: 'toTheDashboard', // OPTIONAL
        icon: 'group' // OPTIONAL
      }, {
        key: 'birthdate',
        type: 'date',
        linkedKey: 'profile_birthdate', // OPTIONAL
        icon: 'group' // OPTIONAL
      }, {
        key: 'gender',
        type: 'dropdown',
        linkedKey: 'profile_gender', // OPTIONAL
        icon: 'group' // OPTIONAL
      }, {
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
            key: 'languages',
            type: 'text'
          }, {
            key: 'email',
            type: 'email'
          }, {
            key: 'phone',
            type: 'tel'
          }]
        }
      }, {
        key: 'languageIds',
        type: 'array',
        item: {
          key: 'languageId',
          type: 'dropdown',
          allowedValues: Languages.allowedValues,
          action: {
            type: 'method',
            icon: 'trash',
            method: 'vessel.visit.language.delete'
          }
        }
      }]
    }]
  }
});
