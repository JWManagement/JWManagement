import '/imports/api/projects/projects.js'

import '/imports/api/util/templateHelpers.js'

import '/imports/api/routes/mainRoutes.js'
import '/imports/api/routes/projectRoutes.js'
import '/imports/api/routes/policyRoutes.js'

import '/imports/ui/DetailsForm/DetailsForm.js';
import '/imports/ui/InsertForm/InsertForm.js';
import '/imports/ui/SearchForm/SearchForm.js';
import '/imports/ui/UpdateForm/UpdateForm.js';

import '/imports/ui/admin/admin.jade';
import '/imports/ui/admin/admin.details.js';

import '/imports/ui/users/users.jade';
import '/imports/ui/users/user.search.js';
import '/imports/ui/users/user.details.js';
import '/imports/ui/users/user.update.js';
import '/imports/ui/users/user.insert.js';
import '/imports/ui/users/user.password.insert.js';

import '/imports/ui/vessels/vessels.jade';
import '/imports/ui/vessels/vessel.search.js';
import '/imports/ui/vessels/vessel.details.js';
import '/imports/ui/vessels/vessel.update.js';
import '/imports/ui/vessels/vessel.insert.js';
import '/imports/ui/vessels/vessel.visit.details.js';
import '/imports/ui/vessels/vessel.visit.update.js';
import '/imports/ui/vessels/vessel.visit.insert.js';
import '/imports/ui/vessels/vessel.visit.language.insert.js';

import '/imports/ui/notes/notes.jade';
import '/imports/ui/notes/note.search.js';
import '/imports/ui/notes/note.details.js';
import '/imports/ui/notes/note.update.js';
import '/imports/ui/notes/note.insert.js';

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
