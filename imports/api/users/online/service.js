import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';

// import Users from '/imports/api/users/Users';

Meteor.methods({
  'users.online.get'() {
    return {
      users: [{
        _id: 'adm',
        user: 'Max Mustermann'
      }]
    };
  }
});
