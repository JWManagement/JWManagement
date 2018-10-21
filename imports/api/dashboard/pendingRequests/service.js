import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import moment from 'moment'

import Permissions from '../../../framework/Constants/Permissions'

import {
  getProjects,
  getPendingRequests,
  getCleanedShifts
} from '../Functions'

Meteor.methods({
  'dashboard.pendingRequests.get' () {
    const userId = Meteor.userId()
    const projectIds = Roles.getAllGroupsForUser(userId, Permissions.member)
    const today = parseInt(moment().format('YYYYDDDD'), 10)

    const projects = getProjects(projectIds)
    const pendingRequests = getPendingRequests(projectIds, projects, today, userId)

    return {
      pendingRequests: getCleanedShifts(pendingRequests)
    }
  }
})
