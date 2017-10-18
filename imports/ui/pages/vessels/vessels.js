import {
    Vessels
} from '/imports/api/vessels/vessels.coffee';
import {
    Counts
} from '/imports/api/counts/counts.coffee';

import '/imports/ui/components/addVesselModal/addVesselModal.coffee';
import '/imports/ui/components/editVesselModal/editVesselModal.coffee';
import './vessels.tpl.jade';

Template.vessels.searchString = new ReactiveVar('');
isLoading = new ReactiveVar(false);
noResults = new ReactiveVar(true);
itemCount = new ReactiveVar;
awaitedCount = new ReactiveVar;
regEx = new ReactiveVar;
table = null;
language = '';
Template.vessels.handle = null;

Template.vessels.helpers({

    isLoading: () => {
        return isLoading.get();
    },

    noResults: () => {
        return noResults.get() && !isLoading.get();
    },

    moreResultsAvailable: () => {
        var regExSearch = regEx.get();

        return Vessels.find({
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

Template.vessels.onCreated(() => {

    Template.vessels.searchString.set('');
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
                    paging: {
                        enabled: true,
                        size: 20
                    },
                    sorting: {
                        enabled: true
                    },
                    editing: {
                        enabled: true,
                        alwaysShow: true,
                        allowAdd: false,
                        allowDelete: false,
                        editRow: (row) => {
                            wrs(() => {
                                FlowRouter.setQueryParams({
                                    editVessel: row.value._id
                                });
                            });
                        }
                    }
                });
            });
        }
    });

    Tracker.autorun(() => {
        var ready = Template.vessels.handle !== null && Template.vessels.handle.ready();
        var search = Template.vessels.searchString.get();

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

    return Vessels.find().observeChanges({
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

Template.vessels.events({

    'keyup #search': (e) => {
        updateSearch(e.target.value);
    },

    'change #search': (e) => {
        updateSearch(e.target.value);
    },

    'click #more': (e) => {
        isLoading.set(true);
        doSubscribe(true);
    },

    'click #addVessel': () => {
        wrs(() => {
            FlowRouter.setQueryParams({
                addVessel: true
            });
        });
    }
});

function updateSearch(search) {
    if (Template.vessels.searchString.get() !== search) {
        Template.vessels.searchString.set(search);

        if (search.length > 0) {
            regEx.set(new RegExp('.*' + search + '.*', 'i'));
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

    if (Template.vessels.handle !== null)
        Template.vessels.handle.stop();

    var search = Template.vessels.searchString.get();
    var projectId = FlowRouter.getParam('projectId');

    Template.vessels.handle = Meteor.subscribe('vessels', search, projectId, retrieveAllResults);

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

    var vessels = Vessels.find({
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

    var vessels = Vessels.find({
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
            breakpoints: 'xs'
        },
        {
            name: 'imo',
            title: TAPi18n.__('vessels.imo'),
            breakpoints: 'xs'
        },
        {
            name: 'mmsi',
            title: TAPi18n.__('vessels.mmsi'),
            breakpoints: 'xs'
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
