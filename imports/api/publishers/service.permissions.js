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
    const tagPermissions = Roles.getRolesForUser(userId, tag._id);

    if (tagPermissions.length > 0) {
      tags.push({
        _id: tag._id,
        tag: tag.name,
        role: tagPermissions[0]
      });
    } else {
      tags.push({
        _id: tag._id,
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

// PROJECT

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

// TAG

function publisherPermissionsTagsGet({ projectId, userId, tagId }) {
  checkPermissions(projectId, userId);

  const role = Roles.getRolesForUser(userId, tagId)[0];

  return {
    role: role
  };
}

function publisherPermissionsTagGet({ projectId, userId, tagId }) {
  checkPermissions(projectId, userId);

  return Roles.getRolesForUser(userId, tagId)[0];
}

function publisherPermissionsTagUpdate({ projectId, userId, tagId }, key, value) {
  checkPermissions(projectId, userId);

  if (Permissions.participantWithNone.includes(value)) {
    Roles.removeUsersFromRoles(userId, Permissions.participant, tagId);

    if (value != 'none') {
      Roles.setUserRoles(userId, value, tagId);
    }

    return true;
  }

  throw new Meteor.Error("Permission type not supported");
}

export {
  publisherPermissionsGet,
  publisherPermissionsProjectGet,
  publisherPermissionsUpdate,
  publisherPermissionsTagsGet,
  publisherPermissionsTagGet,
  publisherPermissionsTagUpdate
};
