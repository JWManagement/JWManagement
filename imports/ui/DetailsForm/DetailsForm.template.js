import Permissions from '/imports/api/util/Permissions.js';

Template['DetailsForm.Template'].helpers({
    data() {
        return {

            // OPTIONAL: the method called to get the data
            getMethod: 'myEndpoint.get',

            // the configuration for the navigation template
            navigation: {

                // OPTIONAL: the template name for the backlink
                backLink: 'vessel.search',

                // OPTIONAL: a css class to add to the .navbar
                navbarStyle: 'flat',

                // OPTIONAL: if the title should be hidden
                hideTitle: true
            },

            // the configuration for the sections
            sections: [{

                // the header for the section
                header: 'mySection',

                contents: [{
                    key: 'myKey',
                    icon: 'group',
                    type: [{
                        key: 'project',
                        click: {
                            type: 'link',
                            link: 'project.details'
                        }
                    }]
                }]
            }]
        }
    }
});
