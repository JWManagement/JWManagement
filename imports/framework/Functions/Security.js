import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import Permissions from '/imports/framework/Constants/Permissions'

function checkPermissions (projectId, userId = null) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (project === null) {
    throw new Meteor.Error('projectNotFound')
  }

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.admin, projectId)) {
    throw new Meteor.Error('youAreNotProjectAdmin')
  }

  if (userId !== null && !Roles.userIsInRole(userId, Permissions.member, projectId)) {
    throw new Meteor.Error('userIsNotProjectMember')
  }
}

export { checkPermissions }
