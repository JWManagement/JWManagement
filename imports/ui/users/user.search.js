import { Template } from 'meteor/templating';

Template['user.search'].helpers({
  data: {
    entityId: 'userId',
    backLink: 'dashboard.details',
    columns: [{
      name: '_id',
      visible: false
    }, {
      name: 'profile_firstname',
      mobile: true
    }, {
      name: 'profile_lastname',
      mobile: true
    }, {
      name: 'username',
      mobile: true
    }, {
      name: 'profile_email',
      mobile: true
    }],
    searchCriteria: (search, projectId) => {
      return {
        selector: {
          $or: [{
            _id: search
          }, {
            'profile.firstname': search
          }, {
            'profile.lastname': search
          }, {
            username: search
          }, {
            'profile.email': search
          }]
        },
        options: {
          sort: {
            'profile.lastname': 1,
            'profile.firstname': 1,
            username: 1
          }
        }
      };
    }
  }
});
