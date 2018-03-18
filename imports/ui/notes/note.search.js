import Notes from '/imports/api/notes/notes.js';

Template['note.search'].helpers({
    data() {
        return {
            db: Notes,
            entityId: 'noteId',
            backLink: 'admin.details',
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
