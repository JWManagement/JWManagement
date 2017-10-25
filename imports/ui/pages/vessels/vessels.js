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
        },
        {
            name: 'type',
            title: TAPi18n.__('vessels.type'),
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
