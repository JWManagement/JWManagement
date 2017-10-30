import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.tpl.jade';

const EntityForm = require('/imports/api/EntityForm/EntityForm.js')

var db = Vessels;
var templateName = 'vessel';
var publicationName = 'vessel';

new EntityForm(
    db,
    templateName,
    publicationName);
