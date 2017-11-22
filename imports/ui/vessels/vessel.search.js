import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';

import './vessel.search.tpl.jade';

import '/imports/ui/SearchForm/SearchForm.js';

Template['vessel.search'].helpers({
    data: () => {
        return {
            db: Vessels,
            getColumns: [{
                name: '_id',
                visible: false
            }, {
                name: 'name',
                mobile: true
            }, {
                name: 'flag',
                mobile: true
            }, {
                name: 'type',
                dropdown: 'vesselType',
                mobile: true
            }, {
                name: 'callsign',
                mobile: true
            }, {
                name: 'eni'
            }, {
                name: 'imo'
            }, {
                name: 'mmsi'
            }],
            searchCriteria: (search) => {
                return {
                    selector: {
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
                    },
                    options: {
                        sort: {
                            name: 1,
                            callsign: 1
                        }
                    }
                };
            }
        };
    }
});
