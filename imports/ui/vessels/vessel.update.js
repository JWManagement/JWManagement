import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.update.tpl.jade';

const UpdateForm = require('/imports/api/UpdateForm/UpdateForm.js');

var db = Vessels;
var templateName = 'vessel.update';
var publicationName = 'vessel';

new UpdateForm(
    db,
    templateName,
    publicationName);
