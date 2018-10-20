import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'account.delete' () {
    Meteor.users.remove(Meteor.userId())
  }
})
