import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.tpl.jade';

const EntityForm = require('/imports/api/EntityForm/EntityForm.js')

var db = Vessels;
var templateName = 'vessel';
var publicationName = 'vessel';
var sections = [{
    header: 'identificationSection',
    contents: [{
        key: 'name',
        value: 'Super vessel 8000'
    }, {
        key: 'flag',
        value: 'Germany'
    }, {
        key: 'type',
        value: 'rc',
        type: 'dropdown'
    }, {
        key: 'callsign',
        value: '12341234'
    }, {
        key: 'eni',
        value: '12341234'
    }, {
        key: 'imo',
        value: '12341234'
    }, {
        key: 'mmsi',
        value: '12341234'
    }],
}, {
    header: 'visitSection',
    contents: [{
        key: 'lastVisit',
        value: '12341234'
    }, {
        key: 'nextVisitAfter',
        value: '12341234'
    }, {
        key: 'languages',
        value: '12341234'
    }, {
        key: 'comments',
        value: '12341234'
    }]
}]

new EntityForm(
    db,
    templateName,
    publicationName,
    sections);
