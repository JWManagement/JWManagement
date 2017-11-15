import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.search.tpl.jade';

import '/imports/ui/SearchForm/SearchForm.js';

Template['vessel.search'].helpers({
    data: () => {
        return {
            db: Vessels,
            templateName: 'vessels',
            publicationName: 'vessels',
            translatedAttributes: [{
                attribute: 'type',
                i18nPath: 'vessels.types'
            }],
            searchCriteria: (search) => {
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
            },
            getColumns: () => {
                return [{
                    name: '_id',
                    visible: false
                }, {
                    name: 'name',
                    title: TAPi18n.__('vessels.name'),
                    mobile: true
                }, {
                    name: 'flag',
                    title: TAPi18n.__('vessels.flag'),
                    mobile: true
                }, {
                    name: 'type',
                    title: TAPi18n.__('vessels.type'),
                    mobile: true
                }, {
                    name: 'callsign',
                    title: TAPi18n.__('vessels.callsign'),
                    mobile: true
                }, {
                    name: 'eni',
                    title: TAPi18n.__('vessels.eni')
                }, {
                    name: 'imo',
                    title: TAPi18n.__('vessels.imo')
                }, {
                    name: 'mmsi',
                    title: TAPi18n.__('vessels.mmsi')
                }];
            }
        };
    }
});
