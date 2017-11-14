import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.details.tpl.jade';

const DetailsForm = require('/imports/ui/DetailsForm/DetailsForm.js');

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
        key: 'lastVisit',
        type: 'date'
    }, {
        key: 'nextVisit',
        type: 'date'
    }]
}];

new DetailsForm(
    db,
    templateName,
    publicationName,
    sections);
