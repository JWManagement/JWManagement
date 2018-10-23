// import { Projects } from '../../api/projects/projects' STILL GLOBAL VARIABLE
// import { Weeks } from '../../api/weeks/weeks.coffee' STILL GLOBAL VARIABLE
// import { Shifts } from '../../api/shifts/shifts.coffee' STILL GLOBAL VARIABLE

import { Meteor } from 'meteor/meteor'

import { Permissions } from '../Constants/Permissions'
import { Roles } from 'meteor/alanning:roles'

const Checks = {
  user: {
    validId (userId) {
      const user = Meteor.users.findOne(userId, {
        fields: {
          _id: 1
        }
      })

      if (user == null) {
        throw new Meteor.Error('invalidUserId')
      }
    }
  },
  shift: {
    validId (shiftId) {
      const shift = Shifts.findOne(shiftId, {
        fields: {
          _id: 1
        }
      })

      if (shift == null) {
        throw new Meteor.Error('invalidShiftId')
      }
    },
    isTagParticipant (shiftId) {
      const shift = Shifts.findOne(shiftId, {
        fields: {
          tagId: 1
        }
      })

      if (!Roles.userIsInRole(Meteor.userId(), Permissions.participant, shift.tagId)) {
        throw new Meteor.Error('notTagParticipant')
      }
    }
  },
  week: {
    validId (weekId) {
      const week = Weeks.findOne(weekId, {
        fields: {
          _id: 1
        }
      })

      if (week == null) {
        throw new Meteor.Error('invalidWeek')
      }
    }
  },
  project: {
    validId (projectId) {
      const project = Projects.findOne(projectId, {
        fields: {
          _id: 1
        }
      })

      if (project == null) {
        throw new Meteor.Error('invalidProject')
      }
    },
    isAdmin (projectId) {
      if (!Roles.userIsInRole(Meteor.userId(), Permissions.admin, projectId)) {
        throw new Meteor.Error('notAdmin')
      }
    },
    isShiftAdmin (projectId) {
      if (!Roles.userIsInRole(Meteor.userId(), Permissions.shiftAdmin, projectId)) {
        throw new Meteor.Error('notShiftAdmin')
      }
    },
    isMember (projectId) {
      if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
        throw new Meteor.Error('notMember')
      }
    }
  },
  tag: {
    validId (projectId, tagId) {
      const project = Projects.findOne({
        _id: projectId,
        'tags._id': tagId
      }, {
        fields: {
          _id: 1
        }
      })

      if (project == null) {
        throw new Meteor.Error('invalidTag')
      }
    },
    isParticipant (projectId) {
      if (!Roles.userIsInRole(Meteor.userId(), Permissions.participant, projectId)) {
        throw new Meteor.Error('notTagParticipant')
      }
    },
    isAdmin (projectId, tagId) {
      const project = Projects.findOne({
        _id: projectId,
        'tags._id': tagId
      }, {
        fields: {
          _id: 1
        }
      })

      if (!Roles.userIsInRole(Meteor.userId(), Permissions.admin, project._id)) {
        throw new Meteor.Error('notAdmin')
      }
    }
  },
  team: {
    validId (projectId, teamId) {
      const project = Projects.findOne({
        _id: projectId,
        'teams._id': teamId
      })

      if (project == null) {
        throw new Meteor.Error('invalidTeam')
      }
    }
  },
  meetingPoint: {
    validId (projectId, meetingPointId) {
      const project = Projects.findOne({
        _id: projectId,
        'meetings._id': meetingPointId
      })

      if (project == null) {
        throw new Meteor.Error('invalidMeetingPoint')
      }
    }
  }
}

export default Checks
