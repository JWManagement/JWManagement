import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

import Users from '/imports/api/users/Users'
import Permissions from '/imports/framework/Constants/Permissions'

Meteor.methods({
  'calendar.getShifts': ({ projectId, date }) => {
    checkPermissions(projectId)

    try {
      const isSupport = Roles.userIsInRole(Meteor.userId(), 'support')
      const project = Projects.findOne(projectId, {
        fields: {
          tags: 1,
          teams: 1
        }
      })
      let tagIds = project.tags.map((tag) => {
        return tag._id
      })

      if (!isSupport) {
        const myRoles = Roles.getGroupsForUser(Meteor.userId())

        tagIds = tagIds.filter((tagId) => {
          return myRoles.indexOf(tagId) > -1
        })
      }

      const shifts = Shifts.find({
        projectId: projectId,
        tagId: {
          $in: tagIds
        },
        date: date
      }, {
        fields: {
          date: 1,
          start: 1,
          end: 1,
          status: 1,
          tagId: 1,
          'teams._id': 1,
          'teams.status': 1,
          'teams.participants': 1,
          'teams.pending': 1
        },
        sort: {
          start: 1,
          end: 1,
          tagId: 1
        }
      })
        .fetch()

      let userIds = []

      for (let shift of shifts) {
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

          team.approvedRequests = team.participants.length || 0
          team.pendingRequests = team.pending.length || 0

          for (let user of team.participants.concat(team.pending)) {
            userIds.push(user._id)
          }
        }
      }

      const users = Users.find({
        _id: {
          $in: userIds
        }
      }, {
        fields: {
          roles: true
        }
      }).fetch()

      const teamleadRoles = ['teamleader', 'substituteTeamleader']

      for (let shift of shifts) {
        for (let team of shift.teams) {
          if (team.participants.length === 0 && team.pending.length > 0) {
            team.isTlNeeded = true

            for (let request of team.pending) {
              for (let user of users) {
                if (user._id === request._id) {
                  if (user.roles[Roles.GLOBAL_GROUP] != null &&
                    user.roles[Roles.GLOBAL_GROUP].indexOf('teamleader') > -1) {
                    team.isTlNeeded = false
                    break
                  }

                  for (let role in user.roles) {
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
          } else {
            team.isTlNeeded = false
          }
        }
      }

      return shifts
    } catch (e) {
      console.log(e)
    }
  }
})

function checkPermissions (projectId) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (project == null) {
    throw new Meteor.Error('projectNotFound')
  }

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
    throw new Meteor.Error('userNotProjectMember')
  }
}
