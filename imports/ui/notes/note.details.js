Template['note.details'].helpers({
    data() {
        return {
            getMethod: 'note.get',
            backLink: 'note.search',
            sections: [
                {
                    header: 'title',
                    contents: [
                        {
                            key: 'title'
                        }
                    ]
                }, {
                    header: 'text',
                    contents: [
                        {
                            key: 'text',
                            type: 'textbox'
                        }
                    ]
                }, {
                    header: 'meta',
                    contents: [
                        {
                            key: 'author',
                            readonly: true
                        }, {
                            key: 'datetime',
                            readonly: true
                        }
                    ]
                }
            ]
        }
    }
});
