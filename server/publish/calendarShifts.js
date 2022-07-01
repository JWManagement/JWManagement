import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'
import Users from '../../imports/api/users/Users'

const isShiftRelevant = (shift, project, user) => {
  if (!project || !user) {
    return false
  }
  const isSupport = Roles.userIsInRole(Meteor.userId(), 'support')
  let tagIds = project.tags.map((tag) => tag._id)
  if (!isSupport) {
    // Roles.getGroupsForUser(Meteor.userId()) does not work correctly
    const myRoles = Object.keys(user.roles).filter(role => user.roles[role] && user.roles[role].length > 0)
    tagIds = tagIds.filter((tagId) => myRoles.indexOf(tagId) > -1)
  }
  return tagIds.includes(shift.tagId)
}

const teamleadRoles = ['teamleader', 'substituteTeamleader']

// This is unverified, mostly taken from old service.js 'calendar.getShifts'
const enrichShift = (shift, project) => {

  for (let tag of project.tags) {
    if (tag._id === shift.tagId) {
      shift.tag = tag.name
    }
  }

  for (let team of shift.teams) {
    for (let projectTeam of project.teams) {
      if (team._id === projectTeam._id) {
        team.name = projectTeam.name
        team.icon = projectTeam.icon
      }
    }
  }

  const userIds = shift.teams.map(team => [...team.participants, ...team.pending]
    .map((user) => user._id)).flat(1)

  const users = Users.find({
    _id: { $in: userIds }
  }, {
    fields: { roles: true }
  }).fetch()

  for (const team of shift.teams) {
    team.approvedRequests = team.participants.length || 0
    team.pendingRequests = team.pending.length || 0
    if (team.participants.length > 0 || team.pending.length === 0) {
      team.isTlNeeded = false
      continue
    }
    team.isTlNeeded = true

    for (const request of team.pending) {
      for (const user of users) {
        if (user._id === request._id) {
          if (user.roles[Roles.GLOBAL_GROUP] != null &&
            user.roles[Roles.GLOBAL_GROUP].indexOf('teamleader') > -1) {
            team.isTlNeeded = false
            break
          }

          for (const role in user.roles) {
            if (role === shift.tagId) {
              const isTeamleader = teamleadRoles.indexOf(user.roles[role][0]) > -1

              if (isTeamleader) {
                team.isTlNeeded = false
                break
              }
            }
          }

          if (!team.isTlNeeded) {
            break
          }
        }
      }

      if (!team.isTlNeeded) {
        break
      }
    }
  }
}


Meteor.publish('calendarShifts', function (projectId, date) {
  let project
  let user
  let shifts = []

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
    throw new Meteor.Error('userNotProjectMember')
  }

  const handleUser = (document, oldDocument) => {
    user = document
    for (const shift of shifts) {
      if (
        isShiftRelevant(shift, project, user) &&
        !isShiftRelevant(shift, project, oldDocument)
      ) {
        enrichShift(shift, project)
        this.added('shifts', shift._id, shift)
      }
      else if (
        !isShiftRelevant(shift, project, user) &&
        isShiftRelevant(shift, project, oldDocument)
      ) {
        enrichShift(shift, project)
        this.removed('shifts', shift._id)
      }
    }
  }

  const handleProject = (document, oldDocument) => {
    project = document
    for (const shift of shifts) {
      if (
        isShiftRelevant(shift, project, user) &&
        !isShiftRelevant(shift, oldDocument, user )
      ) {
        enrichShift(shift, project)
        this.added('shifts', shift._id, shift)
      }
      else if (
        !isShiftRelevant(shift, project, user) &&
        isShiftRelevant(shift, oldDocument, user)
      ) {
        enrichShift(shift, project)
        this.removed('shifts', shift._id)
      }
    }
  }

  const handleShiftAdded = (document) => {
    shifts.push(document)
    if (isShiftRelevant(document, project, user)) {
      enrichShift(document, project)
      this.added('shifts', document._id, document)
    }
  }

  const handleShiftRemoved = (document) => {
    shifts = shifts.filter(shift => shift._id === document._id)
    if (isShiftRelevant(document, project, user)) {
      this.removed('shifts', document._id)
    }
  }

  const handleShiftChanged = (document) => {
    if (isShiftRelevant(document, project, user)) {
      enrichShift(document, project)
      this.changed('shifts', document._id, document)
    }
  }

  // observe user: they may be added to and removed from groups
  const userObserver = Users.find(Meteor.userId(), {fields: {roles: 1}})
    .observe({added: handleUser, changed: handleUser})

  // observe project: it may have groups added or removed
  const projectObserver = Projects.find(projectId, {fields: {tags: true, teams: true}})
    .observe({added: handleProject, changed: handleProject})


  // observe shifts, of course
  const shiftObserver = Shifts.find({
    projectId: projectId,
    date: date
  })
    .observe({
      added: handleShiftAdded,
      changed: handleShiftChanged,
      removed: handleShiftRemoved,
    })

  this.ready()
  this.onStop(() => {
    userObserver.stop()
    projectObserver.stop()
    shiftObserver.stop()
  })
})
