Template['note.details'].helpers({
    data() {
        return {
            getMethod: 'note.get',
            backLink: 'admin.details',
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
                            key: 'author'
                        }, {
                            key: 'date'
                        }, {
                            key: 'time'
                        }
                    ]
                }
            ]
        }
    }
});
