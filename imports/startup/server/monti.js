import { Meteor } from 'meteor/meteor'
import { Monti } from 'meteor/montiapm:agent'

if (Meteor.isProduction) {
  Monti.connect('7FfwpEeySTRn4QFBC', '0c620f39-7751-4dda-a9d6-685738ef5a4c')
}
