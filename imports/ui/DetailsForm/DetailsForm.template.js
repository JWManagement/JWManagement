const data = {
    // OPTIONAL: the method called to get the data
    getMethod: 'myEndpoint.get',

    // the configuration for the navigation template
    navigation: {

        // OPTIONAL: the template name for the backlink
        backLink: 'vessel.search',

        // OPTIONAL: css classes to add to the .navbar
        navbarStyle: 'flat',

        // OPTIONAL: if the title should be hidden
        hideTitle: true
    },

    // the configuration for the sections
    sections: [{

        // OPTIONAL: the title for the section
        title: 'mySection',

        // OPTIONAL: if this section is the header (with blue background)
        type: 'header',

        // the fields
        contents: [{

            // >> look at the individual controls <<

        }]
    }]
};
