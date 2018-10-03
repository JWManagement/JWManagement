import { Meteor } from 'meteor/meteor'

Meteor.methods({
  getUsernameForEmailAddress (email) {
    const users = Meteor.users.find({
      'profile.email': email
    }, {
      fields: {
        username: 1
      }
    }).fetch()

    if (users.length > 1) {
      throw new Meteor.Error('multipleAccountsFound')
    } else if (users.length == 1) {
      return users[0].username
    } else {
      throw new Meteor.Error('noAccountFound')
    }
  }
})
