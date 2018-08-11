import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Users from '/imports/api/users/Users';

Meteor.methods({
  'user.search': ({ searchString, limit }) => {
    if (!Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
      return [];
    }

    const result = {
      total: 0,
      items: []
    };

    if (typeof searchString != 'string' || searchString == '') {
      return result;
    }

    const regEx = new RegExp(searchString, 'i');

    const cursor = Users.find({
      $or: [
        { _id: searchString },
        { username: regEx },
        { 'profile.firstname': regEx },
        { 'profile.lastname': regEx },
        { 'profile.email': regEx },
        { 'profile.telefon': regEx },
        { 'profile.congregation': regEx }
      ]
    }, {
      fields: {
        username: 1,
        'profile.firstname': 1,
        'profile.lastname': 1,
        'profile.email': 1
      },
      sort: {
        'profile.lastname': 1,
        'profile.firstname': 1,
        username: 1
      },
      limit: limit
    });

    result.total = cursor.count();
    result.items = cursor.fetch();

    return result;
  }
  /* 'user.get': ({ projectId }) => {
    // TODO: write this
  }*/
});
