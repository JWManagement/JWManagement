Template['note.insert'].helpers({
    data() {
        return {
            backLink: 'note.search',
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
