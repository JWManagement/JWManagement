import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'shift.getShiftOverview' ({ shiftId }) {
    return Shifts.findOne(shiftId, {
      fields: {
        projectId: 1,
        date: 1
      }
    })
  }
})
