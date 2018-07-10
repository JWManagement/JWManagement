Template['note.details'].helpers({
    data: {
        getMethod: 'note.get',
        navigation: {
            backLink: 'note.search'
        },
        sections: [{
            title: 'title',
            contents: [{
                key: 'title',
                type: 'text'
            }]
        }, {
            title: 'text',
            contents: [{
                key: 'text',
                type: 'textbox'
            }]
        }, {
            title: 'meta',
            contents: [{
                key: 'author',
                readonly: true
            }, {
                key: 'datetime',
                readonly: true
            }]
        }, {
            title: 'option',
            actions: [{
                key: 'delete',
                type: 'confirm',
                style: 'danger',
                method: 'note.delete',
                route: 'note.search'
            }]
        }]
    }
});
