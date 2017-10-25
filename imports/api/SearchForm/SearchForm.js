import {
    Counts
} from '/imports/api/counts/counts.coffee';

import './SearchForm.tpl.jade';

module.exports = class SearchForm {
    constructor(
        db,
        templateName,
        publicationName,
        translatedAttributes,
        searchCriteria,
        getColumns
    ) {
        this.searchString = new ReactiveVar('');
        this.isLoading = new ReactiveVar(false);
        this.noResults = new ReactiveVar(true);
        this.itemCount = new ReactiveVar(0);
        this.awaitedCount = new ReactiveVar(0);
        this.regEx = new ReactiveVar(new RegExp(''));
        this.table = null;
        this.language = '';
        this.handle = null;
        this.maxResultsShown = 20;

        this.db = db;
        this.templateName = templateName;
        this.publicationName = publicationName;
        this.translatedAttributes = translatedAttributes;
        this.searchCriteria = searchCriteria;
        this.getColumns = getColumns;

        this.registerHelpers();
        this.registerOnCreated();
        this.registerOnRendered();
        this.registerEvents();
    }

    registerHelpers() {
        Template.registerHelper('getTemplate', () => {
            return Template[this.templateName].helpers;
        });

        Template.registerHelper('valueOrDash', (value) => {
            return (value != '' ? value : '-');
        });

        Template.registerHelper('isLoading', () => {
            return this.isLoading.get();
        });

        Template.registerHelper('noResults', () => {
            return this.noResults.get() && !this.isLoading.get();
        });

        Template.registerHelper('results', () => {
            if (!this.noResults.get() && !this.isLoading.get()) {
                var results = this.db.find(this.searchCriteria(this.regEx.get()), {
                    sort: {
                        name: 1,
                        callsign: 1
                    }
                }).fetch();

                if (results.length > 0) {
                    return results;
                }
            }

            return false;
        });

        Template.registerHelper('moreResultsAvailable', () => {
            return this.db.find(this.searchCriteria(this.regEx.get()), {
                sort: {
                    name: 1
                }
            }).fetch().length == this.maxResultsShown;
        });

        Template.registerHelper('totalFound', () => {
            var counters = Counts.find({
                _id: this.publicationName
            }, {
                fields: {
                    count: 1
                }
            });

            if (counters.count() > 0) {
                return counters.fetch()[0].count;
            }
            return '';
        });

        Template.registerHelper('maxResultsShown', () => {
            return this.maxResultsShown;
        });
    }

    registerOnCreated() {
        Template[this.templateName].onCreated(() => {
            this.searchString.set('');
            this.isLoading.set(false);
            this.noResults.set(true);
            this.itemCount.set(0);
            this.awaitedCount.set(-1);

            Tracker.autorun(() => {
                var tempLanguage = FlowRouter.getParam('language');

                if (this.language !== tempLanguage) {
                    this.language = tempLanguage;

                    Tracker.afterFlush(() => {
                        $('#table').html('');

                        this.table = FooTable.init('#table', {
                            columns: this.getColumns(),
                            rows: this.getRows(),
                            empty: '',
                            showToggle: false,
                            paging: {
                                enabled: true,
                                size: this.maxResultsShown
                            },
                            sorting: {
                                enabled: true
                            }
                        });
                    });
                }
            });

            Tracker.autorun(() => {
                var ready = this.handle !== null && this.handle.ready();
                var search = this.searchString.get();

                if (this.isLoading.get()) {
                    var rowCount = this.getRowCount();
                    var awaited = this.awaitedCount.get()

                    if (awaited == 0 || search.length == 0 || ready) {
                        if (rowCount == awaited) {
                            this.itemCount.set(rowCount);
                            this.table.loadRows(this.getRows());
                            this.isLoading.set(false);
                        }
                    }
                }
            });

            return this.db.find().observeChanges({
                added: () => {
                    this.reloadRowsIfIsUpdate()
                },
                changed: () => {
                    if (!this.isLoading.get()) {
                        this.table.loadRows(getRows());
                    }
                },
                removed: () => {
                    this.reloadRowsIfIsUpdate()
                }
            });
        });
    }

    registerOnRendered() {
        Template[this.templateName].onRendered(() => {
            $('#search').keyup((e) => {
                this.updateSearch(e.target.value);
            });
            $('#search').change((e) => {
                this.updateSearch(e.target.value);
            });
        })
    }

    registerEvents() {
        Template[this.templateName].events({
            'click #more': (e) => {
                this.isLoading.set(true);
                this.doSubscribe(true);
            },
            'click #createNew': () => {
                wrs(() => {
                    FlowRouter.setQueryParams({
                        createNew: true
                    });
                });
            }
        });
    }

    getRowCount() {
        if (this.regEx.get() == '') {
            return 0;
        }

        var items = this.db.find(this.searchCriteria(this.regEx.get()), {
            fields: {
                _id: 1
            }
        }).fetch();

        if (items.length == 0) {
            this.noResults.set(true);
        } else {
            this.noResults.set(false);
        }

        return items.length;
    }

    getRows() {
        if (this.regEx.get() == '') {
            return [];
        }

        return this.db.find(this.searchCriteria(this.regEx.get()), {
                sort: {
                    name: 1
                }
            })
            .fetch()
            .map((item) => {
                for (var i = 0; i < this.translatedAttributes.length; i++) {
                    var attr = this.translatedAttributes[i]['attribute'];
                    item[attr] = TAPi18n.__(this.translatedAttributes[i]['i18nPath'] + '.' + item[attr]);
                }
                return item;
            });
    }

    reloadRowsIfIsUpdate() {
        if (!this.isLoading.get()) {
            var rowCount = this.getRowCount();

            if (this.itemCount.get() != rowCount) {
                this.itemCount.set(rowCount);
                this.table.loadRows(this.getRows());
            }
        }
    }

    updateSearch(search) {
        if (this.searchString.get() !== search) {
            this.searchString.set(search);

            if (search.length > 0) {
                if (search.length == 1 && (search == '*' || search == '?' || search == '%')) {
                    this.searchString.set('.');
                    this.regEx.set(new RegExp('.', 'i'));
                } else {
                    this.regEx.set(new RegExp(search, 'i'));
                }
                this.doSubscribe();
            } else {
                this.awaitedCount.set(0)
                this.noResults.set(true);
                this.regEx.set('');
            }

            this.isLoading.set(true);
        }
    }

    doSubscribe(retrieveAllResults = false) {
        if (this.handle !== null) {
            this.handle.stop();
        }

        var search = this.searchString.get();
        var projectId = FlowRouter.getParam('projectId');
        var limit = retrieveAllResults ? 0 : this.maxResultsShown;

        this.handle = Meteor.subscribe(this.publicationName, search, projectId, limit);

        Counts.find(this.templateName, {
            fields: {
                count: 1
            }
        }).observeChanges({
            added: (id, fields) => {
                if (retrieveAllResults) {
                    this.awaitedCount.set(fields.count)
                } else {
                    this.awaitedCount.set(Math.min(this.maxResultsShown, fields.count));
                }
            }
        });
    }
}
