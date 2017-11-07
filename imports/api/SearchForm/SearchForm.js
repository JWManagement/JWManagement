import {
    Counts
} from '/imports/api/counts/counts.coffee';

import './SearchForm.tpl.jade';
import './SearchForm.scss'

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
        this.awaitedCount = new ReactiveVar(-1);
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
        this.registerOnRendered();
        this.registerOnDestroyed();
        this.registerEvents();
    }

    registerHelpers() {
        Template.SearchForm.helpers({
            'getSearchPlaceholder': () => {
                return TAPi18n.__(this.templateName + '.placeholder');
            },
            'valueOrDash': (value) => {
                return (value != '' ? value : '-');
            },
            'isLoading': () => {
                return this.isLoading.get();
            },
            'noResults': () => {
                return this.noResults.get() && !this.isLoading.get();
            },
            'resultsMobile': () => {
                if (!this.noResults.get() && !this.isLoading.get()) {
                    var columns = this.getColumns()
                        .filter((column) => {
                            return column.mobile == true;
                        })
                        .map((column) => {
                            return {
                                name: column.name,
                                translation: TAPi18n.__('vessels.' + column.name)
                            };
                        });

                    return this.getRows()
                        .map((row) => {
                            return {
                                _id: FlowRouter.current().path + '/' + row._id,
                                columns: columns.map((column) => {
                                    return {
                                        th: column.translation,
                                        td: row[column.name]
                                    };
                                })
                            };
                        });
                }

                return false;
            },
            'moreResultsAvailable': () => {
                return this.db.find(this.searchCriteria(this.regEx.get()), {
                    sort: {
                        name: 1
                    }
                }).fetch().length == this.maxResultsShown;
            },
            'totalFound': () => {
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
            },
            'maxResultsShown': () => {
                return this.maxResultsShown;
            }
        });
    }

    registerOnRendered() {
        Template.SearchForm.onRendered(() => {
            $('body').addClass('md-skin');
            $('body').addClass('top-navigation');
            $('body').attr('type', 'SearchForm');

            if (this.searchString.get() != '') {
                this.language = '';
            }

            var template = Template.instance();

            template.autorun(() => {
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

            template.autorun(() => {
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

            this.changeObserver = this.db.find().observeChanges({
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

            if ($('#search').val() == '' && $('#search').val() != this.searchString.get()) {
                var search = this.searchString.get();
                $('#search').val(search);
                this.searchString.set('');
                this.updateSearch(search);
            }

            $('#search').keyup((e) => {
                this.updateSearch(e.target.value);
            });
            $('#search').change((e) => {
                this.updateSearch(e.target.value);
            });
        });
    }

    registerOnDestroyed() {
        Template.SearchForm.onDestroyed(() => {
            $('body').removeClass('md-skin');
            $('body').removeClass('top-navigation');
            $('body').attr('type', '');

            if (this.handle !== null) {
                this.handle.stop();
            }

            if (this.changeObserver !== null) {
                this.changeObserver.stop();
            }
        });
    }

    registerEvents() {
        Template.SearchForm.events({
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
            },
            'click .results-desktop tr': (e) => {
                FlowRouter.go(FlowRouter.current().path + '/' + $(e.target).closest('tr').find('td').first().html());
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
                    name: 1,
                    callsign: 1
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
        if (!this.isLoading.get() && this.table != undefined) {
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
