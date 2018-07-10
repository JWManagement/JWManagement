Template['template.details'].helpers({
    data: {
        getMethod: 'template.get',
        navigation: {
            backLink: 'dashboard.details', // OPTIONAL
            navbarStyle: 'flat', // OPTIONAL
            hideTitle: true // OPTIONAL
        },
        sections: [{
            title: 'mySection', // OPTIONAL
            type: 'header', // OPTIONAL
            contents: [{
                key: 'firstname',
                type: 'text',
                linkedKey: 'profile_firstname', // OPTIONAL
                icon: 'group', // OPTIONAL
                readonly: true // OPTIONAL
            }, {
                key: 'description',
                type: 'textbox',
                linkedKey: 'news_text' // OPTIONAL
            }, {
                key: 'email',
                type: 'email',
                readonly: true // OPTIONAL
            }, {
                key: 'phone',
                type: 'phone',
                readonly: true // OPTIONAL
            }, {
                key: 'dashboard',
                type: 'link',
                route: 'dashboard.details',
                linkedKey: 'toTheDashboard', // OPTIONAL
                icon: 'group' // OPTIONAL
            }, {
                key: 'birthdate',
                type: 'date',
                linkedKey: 'profile_birthdate', // OPTIONAL
                icon: 'group' // OPTIONAL
            }, {
                key: 'gender',
                type: 'dropdown',
                linkedKey: 'profile_gender', // OPTIONAL
                icon: 'group' // OPTIONAL
            }]
        }]
    }
});
