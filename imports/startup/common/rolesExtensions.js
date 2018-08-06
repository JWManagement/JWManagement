import { Roles } from 'meteor/alanning:roles';

import Users from '/imports/api/users/Users';

Roles.getAllGroupsForUser = function(userId, roles) {
  let groups = [];
  const user = Users.findOne(userId, {
    fields: {
      roles: 1
    }
  });

  for (let group in user.roles) {
    if (group != Roles.GLOBAL_GROUP) {
      for (let role of roles) {
        if (user.roles[group].indexOf(role) > -1) {
          groups.push(group);
          break;
        }
      }
    }
  }

  return groups;
}
