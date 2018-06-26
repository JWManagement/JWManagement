import '/imports/api/datepicker/bootstrap-datepicker.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.de.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.fi.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.fr.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.hu.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.it.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.pl.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.pt.min.js';
import '/imports/api/datepicker/bootstrap-datepicker.ru.min.js';

import '/imports/api/projects/projects.js';

import '/imports/api/util/templateHelpers.js';

import '/imports/ui/routes/mainRoutes.js';
import '/imports/ui/routes/projectRoutes.js';
import '/imports/ui/routes/policyRoutes.js';

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
import '/imports/ui/users/user.profile.availability.details.js';
import '/imports/ui/users/user.profile.availability.insert.js';
import '/imports/ui/users/user.profile.vacation.insert.js';

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

import '/imports/ui/calendar/calendar.js';

import SimpleSchemaHelper from '/imports/api/util/SimpleSchemaHelper.js';
SimpleSchemaHelper.init();

import { TimeSync } from 'meteor/mizzao:timesync';

Meteor.startup(function() {
    BlazeLayout.setRoot('body');

    TimeSync.loggingEnabled = false;
});

Tracker.autorun(function() {
    const routeName = FlowRouter.getRouteName();
    let title = TAPi18n.__('navigation.' + routeName);

    if (routeName === 'home' && !Meteor.user()) {
        title = TAPi18n.__('navigation.login');
    }

    document.title = title + ' | JW Management';
});
