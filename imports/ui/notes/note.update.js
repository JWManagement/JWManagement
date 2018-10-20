import { Template } from 'meteor/templating'

Template['note.update'].helpers({
  data: {
    getMethod: 'note.getField',
    backLink: 'note.details',
    fields: [{
      key: 'title'
    }, {
      key: 'text',
      type: 'textbox'
    }]
  }
})
