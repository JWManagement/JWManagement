import '/imports/api/projects/projects.coffee'

import './templateHelpers.js'

import './mainRoutes.coffee'
import './projectRoutes.coffee'
import './policyRoutes.coffee'

import '/imports/ui/DetailsForm/DetailsForm.js';
import '/imports/ui/InsertForm/InsertForm.js';
import '/imports/ui/SearchForm/SearchForm.js';
import '/imports/ui/UpdateForm/UpdateForm.js';

import '/imports/ui/vessels/vessels.jade';

import { SimpleSchemaHelper } from '/imports/api/util/simpleSchema.coffee'
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
