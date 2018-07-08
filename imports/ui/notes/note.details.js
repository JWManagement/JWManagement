Template['note.details'].helpers({
    data() {
        return {
            getMethod: 'note.get',
            navigation: {
                backLink: 'note.search'
            },
            sections: [{
                header: 'title',
                contents: [{
                    key: 'title'
                }]
            }, {
                header: 'text',
                contents: [{
                    key: 'text',
                    type: 'textbox'
                }]
            }, {
                header: 'meta',
                contents: [{
                    key: 'author',
                    readonly: true
                }, {
                    key: 'datetime',
                    readonly: true
                }]
            }, {
                header: 'option',
                actions: [{
                    key: 'delete',
                    type: 'confirm',
                    style: 'danger',
                    method: 'note.delete',
                    route: 'note.search'
                }]
            }]
        }
    }
});
