Template['publisher.profile.availability.details'].helpers({
  data() {
    const params = FlowRouter.current().params;

    return {
      getMethod: 'publisher.profile.availability.get',
      navigation: {
        backLink: 'publisher.details'
      },
      sections: [{
        title: params.key.split('_').pop(),
        contents: [{
          key: 'availability',
          type: [{
            key: 'timeslot',
            type: 'delete',
            click: {
              type: 'delete',
              method: 'publisher.profile.availability.delete'
            }
          }]
        }],
        actions: [{
          key: 'new',
          type: 'link',
          style: 'primary',
          route: 'publisher.profile.availability.insert'
        }]
      }]
    }
  }
});
