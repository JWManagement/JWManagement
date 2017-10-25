import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessels.tpl.jade';

const SearchForm = require('/imports/api/SearchForm/SearchForm.js')

var db = Vessels;
var templateName = 'vessels';
var publicationName = 'vessels';
var translatedAttributes = [{
    'attribute': 'type',
    'i18nPath': 'vessels.types'
}];
var searchCriteria = (search) => {
    return {
        $or: [{
            name: search
        }, {
            callsign: search
        }, {
            eni: search
        }, {
            imo: search
        }, {
            mmsi: search
        }]
    };
}
var getColumns = () => {
    return [{
            name: '_id',
            visible: false
        },
        {
            name: 'name',
            title: TAPi18n.__('vessels.name')
        },
        {
            name: 'flag',
            title: TAPi18n.__('vessels.flag'),
            breakpoints: 'xs sm'
        },
        {
            name: 'type',
            title: TAPi18n.__('vessels.type'),
            breakpoints: 'xs sm'
        },
        {
            name: 'callsign',
            title: TAPi18n.__('vessels.callsign')
        },
        {
            name: 'eni',
            title: TAPi18n.__('vessels.eni')
        },
        {
            name: 'imo',
            title: TAPi18n.__('vessels.imo')
        },
        {
            name: 'mmsi',
            title: TAPi18n.__('vessels.mmsi')
        },
        {
            name: 'lastVisit',
            title: TAPi18n.__('vessels.lastVisit'),
            breakpoints: 'all'
        },
        {
            name: 'harborGroup',
            title: TAPi18n.__('vessels.harborGroup'),
            breakpoints: 'all'
        },
        {
            name: 'nextVisit',
            title: TAPi18n.__('vessels.nextVisit'),
            breakpoints: 'all'
        },
        {
            name: 'languages',
            title: TAPi18n.__('vessels.languages'),
            breakpoints: 'all'
        },
        {
            name: 'comments',
            title: TAPi18n.__('vessels.comments'),
            breakpoints: 'all'
        }
    ];
};

var vesselSearchForm = new SearchForm(
    db,
    templateName,
    publicationName,
    translatedAttributes,
    searchCriteria,
    getColumns);
