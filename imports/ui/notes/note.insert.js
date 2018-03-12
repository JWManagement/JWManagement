Template['note.insert'].helpers({
    data() {
        return {
            backLink: 'note.search',
            saveLink: 'note.details',
            entityKey: 'noteId',
            fields: [
                {
                    key: 'title'
                }, {
                    key: 'text'
                }
            ]
        }
    }
});
