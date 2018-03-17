Template['note.details'].helpers({
    data() {
        return {
            getMethod: 'note.get',
            backLink: 'note.search',
            sections: [
                {
                    header: 'contentSection',
                    contents: [
                        {
                            key: 'title'
                        }, {
                            key: 'text'
                        }
                    ]
                }, {
                    header: 'metaSection',
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
