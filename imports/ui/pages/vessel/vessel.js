import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.tpl.jade';

const EntityForm = require('/imports/api/EntityForm/EntityForm.js');

var db = Vessels;
var templateName = 'vessel';
var publicationName = 'vessel';
var sections = [{
    header: 'identificationSection',
    contents: [{
        key: 'name'
    }, {
        key: 'flag'
    }, {
        key: 'type',
        dropdownContainer: 'types'
    }, {
        key: 'callsign'
    }, {
        key: 'eni'
    }, {
        key: 'imo'
    }, {
        key: 'mmsi'
    }],
}, {
    header: 'visitSection',
    contents: [{
        key: 'lastVisit'
    }, {
        key: 'nextVisitAfter'
    }]
}];

new EntityForm(
    db,
    templateName,
    publicationName,
    sections);
