import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'account.delete' () {
    Meteor.users.remove(Meteor.userId())
  },
  'TEST_DisplayUsersCollection' () {
    const userCount = Meteor.users.find().fetch().length
    console.log(`Users count: ${userCount}`)
    console.log(Meteor.users.find().fetch())
  }
})
