Template['note.update'].helpers({
    data() {
        return {
            getMethod: 'note.getField',
            backLink: 'note.details',
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
