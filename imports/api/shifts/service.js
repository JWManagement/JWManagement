//import Shifts from '/imports/api/shifts/Shifts.js'
import Permissions from '/imports/api/util/Permissions.js'

Meteor.methods({
  'shift.getShiftOverview': ({ shiftId }) => {
    return Shifts.findOne(shiftId, {
      fields: {
        projectId: 1,
        date: 1
      }
    });
  }
});
