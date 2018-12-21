import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import moment from 'moment'

import Permissions from '../../../framework/Constants/Permissions'

import {
  getProjects,
  getUpcomingShifts,
  getCleanedShifts
} from '../Functions'

Meteor.methods({
  'dashboard.upcomingShifts.get' () {
    const language = Meteor.user().profile.language
    moment.locale(language)

    const userId = Meteor.userId()
    const projectIds = Roles.getAllGroupsForUser(userId, Permissions.member)
    const today = parseInt(moment().format('YYYYDDDD'), 10)

    const projects = getProjects(projectIds)
    const upcomingShifts = getUpcomingShifts(projectIds, projects, today, userId)

    return {
      upcomingShifts: getCleanedShifts(upcomingShifts)
    }
  }
})
