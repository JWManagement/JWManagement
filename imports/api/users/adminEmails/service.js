import { Meteor } from 'meteor/meteor'
import Users from '../Users'

Meteor.methods({
  'users.adminEmails.get' () {
    if (!Roles.userIsInRole(Meteor.userId(), 'support', Roles.GLOBAL_GROUP)) {
      return []
    }

    const admins = Users.find({}, {fields: {'profile.email': 1, roles: 1}})
    const adminEmails = []

    admins.forEach((user) => {
      _.each(user.roles, (roles, group) => {
        if (_.contains(roles, 'admin')) {
          if (user && user.profile && user.profile.email) {
            if (!adminEmails.includes(user.profile.email)) {
              adminEmails.push(user.profile.email)
            }
          }
        }
      })
    })

    return adminEmails
  }
})
