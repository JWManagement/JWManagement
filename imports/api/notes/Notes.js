import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import SimpleSchema from 'simpl-schema'

const CollectionManager = require('/imports/framework/Managers/CollectionManager')

let Notes = {}

Notes.schema = new SimpleSchema({
  _id: {
    type: String,
    autoValue () {
      if (!this.isSet) {
        return Random.id()
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue () {
      if (!this.isSet) {
        return new Date()
      }
    }
  },
  createdBy: {
    type: String,
    autoValue () {
      if (!this.isSet) {
        return Meteor.userId()
      }
    }
  },
  lastChangeBy: {
    type: String,
    autoValue () {
      return Meteor.userId()
    }
  },
  lastChangeAt: {
    type: Date,
    autoValue () {
      return new Date()
    }
  },
  title: {
    type: String
  },
  text: {
    type: String
  }
})

Notes.name = 'notes'

Notes.uniqueKeys = []

Notes.attachSchema = Notes.schema

Notes.persistence = new CollectionManager(Notes, Projects)

export default Notes
