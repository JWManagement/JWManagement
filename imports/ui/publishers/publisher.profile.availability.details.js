import { Template } from 'meteor/templating';

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
          type: 'array',
          item: {
            key: 'timeslot',
            type: 'link',
            action: {
              type: 'method',
              icon: 'trash',
              method: 'publisher.profile.availability.delete'
            }
          }
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
