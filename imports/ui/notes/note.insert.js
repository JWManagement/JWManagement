Template['note.insert'].helpers({
    data() {
        return {
            backLink: 'note.search',
            entityKey: 'noteId',
            fields: [
                {
                    key: 'title',
                    required: true
                }, {
                    key: 'text',
                    type: 'textbox',
                    required: true
                }
            ]
        }
    }
});
