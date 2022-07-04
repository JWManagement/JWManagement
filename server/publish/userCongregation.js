import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import Permissions from '../../imports/framework/Constants/Permissions'

Meteor.publish('userCongregation', function (projectId, userId) {
  if (
    projectId &&
    typeof projectId === 'string' &&
    Roles.userIsInRole(this.userId, Permissions.member, projectId)
  ) {
    const project = Projects.findOne(
      projectId,
      { fields: { showCongregationName: 1 } }
    )
    if (project.showCongregationName) {
      const user = Meteor.users.findOne(
        userId,
        { fields: { profile: 1 } }
      )
      this.added('userCongregations', userId, { congregation: user.profile.congregation })
    }
  }
  this.ready()
})
