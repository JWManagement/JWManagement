Template['admin.details'].helpers({
    data() {
        return {
            backLink: 'dashboard',
            sections: [
                {
                    header: 'administrationSection',
                    contents: [
                        {
                            key: 'settings',
                            link: 'settings'
                        }, {
                            key: 'users',
                            link: 'users.search'
                        }
                    ]
                }
            ]
        }
    }
});
