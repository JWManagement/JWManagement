import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import i18next from 'i18next'
import moment from 'moment'
import Notes from './Notes'
import Users from '../users/Users'
import Permissions from '../../framework/Constants/Permissions'
import { validate } from '../../framework/Functions/validations'
import { defaultValidations } from '../../framework/Functions/defaultValidations'

Meteor.methods({
  'note.search' ({ projectId, searchString }) {
    checkPermissions(projectId)

    const language = Meteor.user().profile.language
    const result = {
      total: 0,
      items: []
    }

    if (typeof searchString !== 'string' || searchString === '') {
      return result
    }

    const notes = Projects.findOne(projectId, {
      fields: {
        notes: 1
      }
    }).notes || []

    for (let note of notes) {
      const user = Users.findOne(note.lastChangeBy, {
        fields: {
          'profile.firstname': 1,
          'profile.lastname': 1
        }
      })

      if (user) {
        moment.locale(language)
        const localTranslate = i18next.getFixedT(language)
        const username = `${user.profile.firstname} ${user.profile.lastname}`
        const dateformat = localTranslate('dateFormat.dateAndTime')

        note.lastChange = `${username} (${moment(note.lastChangeAt).format(dateformat)})`
      } else {
        // legacy support
        note.lastChange = `${note.author} (${moment(note.date, 'YYYYMMDD').format('YYYY-MM-DD')})`
      }

      if (note.text == null) {
        note.text = ''
      } else if (note.text.length > 25) {
        note.text = note.text.substring(0, 25) + ' ...'
      }
    }

    result.total = notes.length
    result.items = notes

    return result
  },
  'note.get' ({ projectId, noteId }) {
    checkPermissions(projectId)

    return getExtendedNote(projectId, noteId)
  },
  'note.getField' ({ projectId, noteId, key }) {
    checkPermissions(projectId)

    return getExtendedNote(projectId, noteId)[key]
  },
  'note.insert' ({ projectId }, note) {
    validate('note', {
      ...defaultValidations.projectAdmin,
      title: String,
      text: String
    }, {
      projectId,
      ...note
    })

    try {
      Notes.persistence.insert(projectId, note)
      return note._id
    } catch (e) {
      throw new Meteor.Error(e)
    }
  },
  'note.update' ({ projectId, noteId }, key, value) {
    checkPermissions(projectId)

    try {
      Notes.persistence.update(projectId, noteId, key, value)
    } catch (e) {
      throw new Meteor.Error(e)
    }
  },
  'note.delete' ({ projectId, noteId }) {
    checkPermissions(projectId)

    try {
      Notes.persistence.delete(projectId, noteId)
    } catch (e) {
      throw new Meteor.Error(e)
    }
  }
})

function getExtendedNote (projectId, noteId) {
  const notes = Projects.findOne(projectId, {
    fields: {
      notes: 1
    }
  }).notes

  let note = null

  for (let n of notes) {
    if (n._id === noteId) {
      note = n
    }
  }

  if (note != null) {
    const user = Users.findOne(note.lastChangeBy, {
      fields: {
        'profile.firstname': 1,
        'profile.lastname': 1
      }
    })

    if (user != null) {
      const username = user.profile.firstname + ' ' + user.profile.lastname
      const language = Meteor.user().profile.language
      moment.locale(language)
      const localTranslate = i18next.getFixedT(language)
      const dateformat = localTranslate('dateFormat.dateAndTime')
      const datetime = moment(note.lastChangeAt).format(dateformat)

      note.author = username
      note.datetime = datetime
    } else {
      // legacy support
      note.datetime = moment(note.date, 'YYYYMMDD').format('YYYY-MM-DD')
    }
  }

  return note
}

function checkPermissions (projectId) {
  const project = Projects.findOne(projectId, { fields: { _id: 1 } })

  if (project == null) {
    throw new Meteor.Error('projectNotFound')
  }

  if (!Roles.userIsInRole(Meteor.userId(), Permissions.member, projectId)) {
    throw new Meteor.Error('userNotProjectMember')
  }
}
