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
                        }, {
                            key: 'text'
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
