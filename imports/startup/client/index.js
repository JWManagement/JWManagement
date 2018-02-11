import '/imports/api/projects/projects.js'

import '/imports/api/util/templateHelpers.js'

import '/imports/api/routes/mainRoutes.js'
import '/imports/api/routes/projectRoutes.js'
import '/imports/api/routes/policyRoutes.js'

import '/imports/ui/DetailsForm/DetailsForm.js';
import '/imports/ui/InsertForm/InsertForm.js';
import '/imports/ui/SearchForm/SearchForm.js';
import '/imports/ui/UpdateForm/UpdateForm.js';

import '/imports/ui/vessels/vessels.jade';

import SimpleSchemaHelper from '/imports/api/util/simpleSchema.js';
SimpleSchemaHelper.init();

Tracker.autorun(() => {
	$('body').attr('page', FlowRouter.getRouteName());
});

window.WithModernizr = (callback) => {
    if (typeof(Modernizr) == 'undefined') {
        $.getScript("/lib/modernizr.min.js", () => {
            callback();
        });
    } else {
        callback();
    }
}
