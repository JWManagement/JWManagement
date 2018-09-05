import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Permissions from '/imports/framework/Constants/Permissions';
import { checkPermissions } from '/imports/framework/Functions/Security';

function publisherPermissionsGet({ projectId, userId }) {
  checkPermissions(projectId, userId);

  const project = Projects.findOne(projectId, {
    fields: {
      'tags._id': 1,
      'tags.name': 1
    }
  });

  let tags = [];

  for (let tag of project.tags) {
    const tagPermissions = Roles.getRolesForUser(userId, projectId);

    if (tagPermissions.length > 0) {
      tags.push({
        tag: tag.name,
        role: tagPermissions[0]
      });
    } else {
      tags.push({
        tag: tag.name,
        role: 'none'
      });
    }
  }

  return {
    project: Roles.getRolesForUser(userId, projectId)[0],
    tags: tags
  };
}

function publisherPermissionsProjectGet({ projectId, userId }) {
  checkPermissions(projectId, userId);

  return Roles.getRolesForUser(userId, projectId)[0];
}

function publisherPermissionsUpdate({ projectId, userId }, key, value) {
  checkPermissions(projectId, userId);

  if (Permissions.member.includes(value)) {
    Roles.removeUsersFromRoles(userId, Permissions.member, projectId);
    Roles.setUserRoles(userId, value, projectId);
    return true;
  }

  throw new Meteor.Error("Permission type not supported");
}

export {
  publisherPermissionsGet,
  publisherPermissionsProjectGet,
  publisherPermissionsUpdate
};
