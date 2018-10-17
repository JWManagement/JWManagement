import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import Permissions from '../../imports/framework/Constants/Permissions'

Meteor.publish('shiftsByWeek', function (projectId, date) {
  const week = Weeks.findOne({
    projectId: projectId,
    date: date
  }, {
    fields: {
      _id: 1,
      projectId: 1
    }
  })

  if (week && Roles.userIsInRole(this.userId, Permissions.member, week.projectId)) {
    return Shifts.find({
      weekId: week._id
    })
  }

  return this.ready()
})
