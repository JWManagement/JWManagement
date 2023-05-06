import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'user.acceptPrivacyPolicy' () {
    Meteor.users.update(
      { _id: this.userId },
      { $set: { privacyPolicyAccepted: true } }
    )
  }
})
