Template['language.details'].helpers({
  data: {
    getMethod: 'language.get',
    navigation: {
      backLink: 'dashboard.details'
    },
    sections: [{
      title: 'languages',
      contents: [{
        key: 'language',
        type: 'dropdown'
      }]
    }]
  }
});
