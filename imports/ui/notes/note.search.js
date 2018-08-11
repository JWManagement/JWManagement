import { Template } from 'meteor/templating';

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
    }],
    searchCriteria: (search) => {
      return {
        selector: {
          $or: [{
            _id: search
          }, {
            title: search
          }, {
            text: search
          }, {
            author: search
          }]
        },
        options: {
          sort: {
            title: 1,
            author: 1,
            date: 1
          }
        }
      };
    }
  }
});
