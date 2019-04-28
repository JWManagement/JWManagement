import { Template } from 'meteor/templating'

Template['note.search'].helpers({
  data: {
    entityId: 'noteId',
    backLink: 'project.details',
    allowCreate: true,
    columns: [{
      name: '_id',
      visible: false
    }, {
      name: 'title',
      mobile: true
    }, {
      name: 'text',
      mobile: true
    }, {
      name: 'lastChange',
      mobile: true
    }]
  }
})
