import '/imports/api/projects/projects.js';
import '/imports/api/messages/messages.coffee';

import '/imports/startup/server/mailer.js';
import '/imports/startup/server/prerenderio.js';

import '/imports/api/util/rolesExtensions.js';

import '/imports/api/dashboard/service.js';
import '/imports/api/languages/service.js';
import '/imports/api/projects/service.js';
import '/imports/api/shifts/service.js';
import '/imports/api/users/service.js';
import '/imports/api/publishers/service.js';
import '/imports/api/vessels/service.js';
import '/imports/api/notes/service.js';
import '/imports/api/calendar/service.js';

import SimpleSchemaHelper from '/imports/api/util/SimpleSchemaHelper.js';
SimpleSchemaHelper.init();
