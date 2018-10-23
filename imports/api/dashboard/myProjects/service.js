import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import Permissions from '../../../framework/Constants/Permissions'

import {
  getProjects,
  getCleanedProjects
} from '../Functions'

Meteor.methods({
  'dashboard.myProjects.get' () {
    const userId = Meteor.userId()
    const projectIds = Roles.getAllGroupsForUser(userId, Permissions.member)
    const projects = getProjects(projectIds)

    return {
      myProjects: getCleanedProjects(projects)
    }
  }
})
