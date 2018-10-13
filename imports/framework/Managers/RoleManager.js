import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import Permissions from '/imports/framework/Constants/Permissions'

const RoleManager = {

  setProjectPermission (projectId, userId, permission) {
    if (Permissions.member.indexOf(permission) > -1) {
      if (Roles.userIsInRole(userId, Permissions.member, projectId)) {
        Roles.removeUsersFromRoles(userId, Permissions.member, projectId)
      }

      Roles.addUsersToRoles(userId, permission, projectId)
    }
  },

  removeProjectPermission (projectId, userId) {
    Roles.removeUsersFromRoles(userId, Permissions.member, projectId)
  },

  setTagPermission (projectId, tagId, userId, permission) {
    // TODO: check that tag belongs to project and i am in project

    if (Permissions.participant.indexOf(permission) > -1) {
      if (Roles.userIsInRole(userId, Permissions.participant, tagId)) {
        Roles.removeUsersFromRoles(userId, Permissions.participant, tagId)
      }

      Roles.addUsersToRoles(userId, permission, tagId)
    }
  },

  removeTagPermission (tagId, userId) {
    Roles.removeUsersFromRoles(userId, Permissions.participant, tagId)
  },

  hasPermission (projectId, permissions, userId = Meteor.userId()) {
    return Roles.userIsInRole(userId, permissions, projectId)
  },

  hasPermissions (userId) {
    const groups = Roles.getGroupsForUser(userId)

    for (let group of groups) {
      if (Roles.userIsInRole(userId, Permissions.member, group)) {
        return true
      }
    }

    return false
  }

}

export default RoleManager
