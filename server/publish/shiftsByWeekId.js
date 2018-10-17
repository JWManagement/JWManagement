import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import Permissions from '../../imports/framework/Constants/Permissions'

Meteor.publish('shiftsByWeekId', function (weekId) {
  const week = Weeks.findOne({
    _id: weekId
  }, {
    fields: {
      projectId: 1
    }
  })

  if (week && Roles.userIsInRole(this.userId, Permissions.member, week.projectId)) {
    return Shifts.find({
      weekId: weekId
    })
  }

  return this.ready()
})
