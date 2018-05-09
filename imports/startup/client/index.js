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

import '/imports/api/routes/mainRoutes.js';
import '/imports/api/routes/projectRoutes.js';
import '/imports/api/routes/policyRoutes.js';

import '/imports/ui/DetailsForm/DetailsForm.js';
import '/imports/ui/InsertForm/InsertForm.js';
import '/imports/ui/SearchForm/SearchForm.js';
import '/imports/ui/UpdateForm/UpdateForm.js';

import '/imports/ui/dashboard/dashboard.jade';
import '/imports/ui/dashboard/dashboard.details.js';

import '/imports/ui/project/project.jade';
import '/imports/ui/project/project.search.js';
import '/imports/ui/project/project.details.js';

import '/imports/ui/publishers/publishers.jade';
import '/imports/ui/publishers/publisher.search.js';
import '/imports/ui/publishers/publisher.details.js';
import '/imports/ui/publishers/publisher.update.js';
import '/imports/ui/publishers/publisher.insert.js';
import '/imports/ui/publishers/publisher.password.insert.js';
import '/imports/ui/publishers/publisher.profile.availability.details.js';
import '/imports/ui/publishers/publisher.profile.availability.insert.js';
import '/imports/ui/publishers/publisher.profile.vacation.insert.js';

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

Tracker.autorun(() => {
	$('body').attr('page', FlowRouter.getRouteName());
});
