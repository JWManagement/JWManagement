import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';
import {
    Counts
} from '/imports/api/counts/counts.coffee';

import '/imports/ui/components/addVesselModal/addVesselModal.coffee';
import '/imports/ui/components/editVesselModal/editVesselModal.coffee';
import './vessels.tpl.jade';

db = Vessels;
searchString = new ReactiveVar('');
isLoading = new ReactiveVar(false);
noResults = new ReactiveVar(true);
itemCount = new ReactiveVar;
awaitedCount = new ReactiveVar;
regEx = new ReactiveVar;
table = null;
language = '';
handle = null;

Template['vessels'].helpers({

    valueOrDash: (value) => {
        return (value != '' ? value : '-');
    },

    isLoading: () => {
        return isLoading.get();
    },

    noResults: () => {
        return noResults.get() && !isLoading.get();
    },

    results: () => {
        if (!noResults.get() && !isLoading.get()) {
            var regExSearch = regEx.get();

            results = db.find({
                $or: [{
                        name: regExSearch
                    },
                    {
                        callsign: regExSearch
                    },
                    {
                        eni: regExSearch
                    },
                    {
                        imo: regExSearch
                    },
                    {
                        mmsi: regExSearch
                    }
                ]
            }, {
                sort: {
                    name: 1,
                    callsign: 1
                }
            }).fetch()

            if (results.length > 0) {
                return results;
            }
        }

        return false;
    },

    moreResultsAvailable: () => {
        var regExSearch = regEx.get();

        return db.find({
            $or: [{
                    name: regExSearch
                },
                {
                    callsign: regExSearch
                },
                {
                    eni: regExSearch
                },
                {
                    imo: regExSearch
                },
                {
                    mmsi: regExSearch
                }
            ]
        }, {
            sort: {
                name: 1
            }
        }).fetch().length === 20;
    },

    totalFound: () => {
        var vesselCounters = Counts.find({
            _id: 'vessels'
        }, {
            fields: {
                count: 1
            }
        });

        if (vesselCounters.count() > 0) {
            return vesselCounters.fetch()[0].count;
        }

        return '';
    }
});

Template['vessels'].onCreated(() => {

    searchString.set('');
    isLoading.set(false);
    noResults.set(true);
    itemCount.set(0);
    awaitedCount.set(-1);

    Tracker.autorun(() => {
        var language;
        var tempLanguage = FlowRouter.getParam('language');

        if (language !== tempLanguage) {
            language = tempLanguage;

            Tracker.afterFlush(() => {
                $('#table').html('');

                table = FooTable.init('#table', {
                    columns: getColumns(),
                    rows: getRows(),
                    empty: '',
                    showToggle: false,
                    paging: {
                        enabled: true,
                        size: 20
                    },
                    sorting: {
                        enabled: true
                    }
                });
            });
        }
    });

    Tracker.autorun(() => {
        var ready = handle !== null && handle.ready();
        var search = searchString.get();

        if (isLoading.get()) {
            var rowCount = getRowCount();
            var awaited = awaitedCount.get()

            if (awaited == 0 || search.length == 0 || ready) {
                if (rowCount == awaited) {
                    itemCount.set(rowCount);
                    table.loadRows(getRows());
                    isLoading.set(false);
                }
            }
        }
    });

    return db.find().observeChanges({
        added: () => {
            reloadRowsIfIsUpdate()
        },
        changed: () => {
            if (!isLoading.get()) {
                table.loadRows(getRows());
            }
        },
        removed: () => {
            reloadRowsIfIsUpdate()
        }
    });
});

Template['vessels'].onRendered(() => {

    $('#search').keyup((e) => {
        updateSearch(e.target.value);
    });

    $('#search').change((e) => {
        updateSearch(e.target.value);
    });
})

Template['vessels'].events({

    'click #more': (e) => {
        isLoading.set(true);
        doSubscribe(true);
    },

    'click #createNew': () => {
        wrs(() => {
            FlowRouter.setQueryParams({
                createNew: true
            });
        });
    }
});

function updateSearch(search) {
    if (searchString.get() !== search) {
        searchString.set(search);

        if (search.length > 0) {
            if (search.length == 1 && (search == '*' || search == '?' || search == '%')) {
                searchString.set('.');
                regEx.set(new RegExp('.', 'i'));
            } else {
                regEx.set(new RegExp(search, 'i'));
            }
            doSubscribe();
        } else {
            awaitedCount.set(0)
            noResults.set(true);
            regEx.set('');
        }

        isLoading.set(true);
    }
};

function doSubscribe(retrieveAllResults = false) {

    if (handle !== null)
        handle.stop();

    var search = searchString.get();
    var projectId = FlowRouter.getParam('projectId');

    handle = Meteor.subscribe('vessels', search, projectId, retrieveAllResults);

    Counts.find('vessels', {
        fields: {
            count: 1
        }
    }).observeChanges({
        added: (id, fields) => {
            if (retrieveAllResults) {
                awaitedCount.set(fields.count)
            } else {
                awaitedCount.set(Math.min(20, fields.count));
            }
        }
    });
};

function getRowCount() {
    if (regEx.get() === '') {
        return 0;
    }

    var vessels = db.find({
        $or: [{
                name: regEx.get()
                },
            {
                callsign: regEx.get()
                },
            {
                eni: regEx.get()
                },
            {
                imo: regEx.get()
                },
            {
                mmsi: regEx.get()
                }
            ]
    }, {
        fields: {
            _id: 1
        }
    }).fetch();

    if (vessels.length === 0) {
        noResults.set(true);
    } else {
        noResults.set(false);
    }

    return vessels.length;
};

function getRows() {
    if (regEx.get() === '') {
        return [];
    }

    var vessels = db.find({
        $or: [{
                name: regEx.get()
                },
            {
                callsign: regEx.get()
                },
            {
                eni: regEx.get()
                },
            {
                imo: regEx.get()
                },
            {
                mmsi: regEx.get()
                }
            ]
    }, {
        sort: {
            name: 1
        }
    }).fetch();

    return vessels.map((vessel) => {
        vessel.type = TAPi18n.__('vessels.types.' + vessel.type);
        return vessel;
    });
};

function reloadRowsIfIsUpdate() {
    if (itemCount.get() !== getRowCount()) {
        itemCount.set(getRowCount());

        if (!isLoading.get()) {
            table.loadRows(getRows());
        }
    }
};

function getColumns() {
    return [{
            name: '_id',
            title: '',
            breakpoints: '',
            visible: false,
            filterable: false
        },
        {
            name: 'name',
            title: TAPi18n.__('vessels.name'),
            breakpoints: ''
        },
        {
            name: 'flag',
            title: TAPi18n.__('vessels.flag'),
            breakpoints: 'xs sm',
            filterable: false
        },
        {
            name: 'type',
            title: TAPi18n.__('vessels.type'),
            breakpoints: 'xs sm',
            filterable: false
        },
        {
            name: 'callsign',
            title: TAPi18n.__('vessels.callsign'),
            breakpoints: ''
        },
        {
            name: 'eni',
            title: TAPi18n.__('vessels.eni'),
            breakpoints: ''
        },
        {
            name: 'imo',
            title: TAPi18n.__('vessels.imo'),
            breakpoints: ''
        },
        {
            name: 'mmsi',
            title: TAPi18n.__('vessels.mmsi'),
            breakpoints: ''
        },
        {
            name: 'lastVisit',
            title: TAPi18n.__('vessels.lastVisit'),
            breakpoints: 'all',
            filterable: false
        },
        {
            name: 'harborGroup',
            title: TAPi18n.__('vessels.harborGroup'),
            breakpoints: 'all',
            filterable: false
        },
        {
            name: 'nextVisit',
            title: TAPi18n.__('vessels.nextVisit'),
            breakpoints: 'all',
            filterable: false
        },
        {
            name: 'languages',
            title: TAPi18n.__('vessels.languages'),
            breakpoints: 'all',
            filterable: false
        },
        {
            name: 'comments',
            title: TAPi18n.__('vessels.comments'),
            breakpoints: 'all',
            filterable: false
        }
    ];
};
