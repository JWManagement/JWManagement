import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.update.tpl.jade';

const UpdateForm = require('/imports/ui/UpdateForm/UpdateForm.js');

var db = Vessels;
var templateName = 'vessel.update';
var publicationName = 'vessel';

new UpdateForm(
    db,
    templateName,
    publicationName);
