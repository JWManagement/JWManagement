import Notes from '/imports/api/notes/notes.js';

Template['note.search'].helpers({
    data() {
        return {
            db: Notes,
            entityId: 'noteId',
            entityLink: 'note.details',
            backLink: 'admin.details',
            columns: [{
                name: '_id',
                visible: false
            }, {
                name: 'title',
                mobile: true
            }, {
                name: 'text'
            }, {
                name: 'lastChange'
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
