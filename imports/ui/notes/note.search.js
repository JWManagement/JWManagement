import Notes from '/imports/api/notes/notes.js';

Template['note.search'].helpers({
    data() {
        return {
            db: Notes,
            entityId: 'noteId',
            entityLink: 'note.details',
            backLink: 'note.details',
            getColumns: [{
                name: '_id',
                visible: false
            }, {
                name: 'title',
                mobile: true
            }, {
                name: 'text',
                visible: false
            }, {
                name: 'author'
            }, {
                name: 'date'
            }, {
                name: 'time'
            }],
            searchCriteria: (search, projectId) => {
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
        };
    }
});
