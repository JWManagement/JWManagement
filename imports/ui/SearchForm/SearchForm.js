import {
    Counts
} from '/imports/api/counts/counts.coffee';

import './SearchForm.tpl.jade';
import './SearchForm.scss'

Template.SearchForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path('admin', {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId')
        });
    },
    'getTitle': (key) => {
        return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
    },
    'getTranslation': (key) => {
        return TAPi18n.__(FlowRouter.getRouteName() + '.' + key);
    },
    'valueOrDash': (value) => {
        return (value != '' ? value : '-');
    },
    'isLoading': () => {
        return Template.instance().isLoading.get();
    },
    'hasSearchString': () => {
        return Template.instance().searchString.get() != '';
    },
    'noResults': () => {
        const template = Template.instance();
        return template.noResults.get() && !template.isLoading.get();
    },
    'resultsMobile': () => {
        const template = Template.instance();

        if (!template.noResults.get() && !template.isLoading.get()) {
            const columns = template.getColumns
                .filter((column) => {
                    return column.mobile == true;
                })
                .map((column) => {
                    return {
                        name: column.name,
                        translation: TAPi18n.__(FlowRouter.getRouteName().replace('search', 'entity.') + column.name)
                    };
                });

            return getRows(template)
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
        const template = Template.instance();
        const searchCriteria = template.searchCriteria(template.regEx.get());

        return template.db
            .find(searchCriteria.selector, searchCriteria.options)
            .fetch().length == template.maxResultsShown;
    },
    'totalFound': () => {
        const counters = Counts.find(FlowRouter.getRouteName(), {
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
        return Template.instance().maxResultsShown;
    }
});

Template.SearchForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.translatedAttributes = data.translatedAttributes;
    template.searchCriteria = data.searchCriteria;
    template.getColumns = data.getColumns.map((column) => {
        column.title = TAPi18n.__(FlowRouter.getRouteName().replace('search', 'entity.') + column.name)
        return column;
    });

    template.searchString = new ReactiveVar(Session.get(FlowRouter.getRouteName() + '.searchString') || '');
    template.isLoading = new ReactiveVar(false);
    template.noResults = new ReactiveVar(true);
    template.itemCount = new ReactiveVar(0);
    template.awaitedCount = new ReactiveVar(-1);
    template.regEx = new ReactiveVar(new RegExp(''));
    template.table = null;
    template.language = '';
    template.handle = null;
    template.maxResultsShown = 20;
});

Template.SearchForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'SearchForm');

    const template = Template.instance();
    template.language = '';

    template.autorun(() => {
        var tempLanguage = FlowRouter.getParam('language');

        if (template.language !== tempLanguage) {
            template.language = tempLanguage;

            Tracker.afterFlush(() => {
                $('#table').html('');

                template.table = FooTable.init('#table', {
                    columns: template.getColumns,
                    rows: getRows(template),
                    empty: '',
                    showToggle: false,
                    paging: {
                        enabled: true,
                        size: template.maxResultsShown
                    },
                    sorting: {
                        enabled: true
                    }
                });
            });
        }
    });

    template.autorun(() => {
        const template = Template.instance();
        const ready = template.handle !== null && template.handle.ready();
        const search = template.searchString.get();

        if (template.isLoading.get()) {
            const rowCount = getRowCount(template);
            const awaited = template.awaitedCount.get()

            if (awaited == 0 || search.length == 0 || ready) {
                if (rowCount == awaited) {
                    template.itemCount.set(rowCount);
                    template.table.loadRows(getRows(template));
                    template.isLoading.set(false);
                }
            }
        }
    });

    template.changeObserver = template.db.find().observeChanges({
        added: () => {
            reloadRowsIfIsUpdate(template)
        },
        changed: () => {
            if (!template.isLoading.get()) {
                template.table.loadRows(getRows(template));
            }
        },
        removed: () => {
            reloadRowsIfIsUpdate(template)
        }
    });

    if ($('#search').val() == '' && $('#search').val() != template.searchString.get()) {
        const search = template.searchString.get();
        $('#search').val(search);
        template.searchString.set('');
        updateSearch(template, search);
    }
});

Template.SearchForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');

    const template = Template.instance();

    if (template.handle !== null) {
        template.handle.stop();
    }

    if (template.changeObserver !== null) {
        template.changeObserver.stop();
    }
});

Template.SearchForm.events({
    'click #more': (e) => {
        const template = Template.instance();
        template.isLoading.set(true);
        doSubscribe(template, true);
    },
    'click #createNew': () => {
        wrs(() => {
            FlowRouter.setQueryParams({
                createNew: true
            });
        });
    },
    'click .results-desktop tbody tr:not(.footable-empty)': (e) => {
        FlowRouter.go(FlowRouter.current().path + '/' + $(e.target).closest('tr').find('td').first().html());
    },
    'keyup #search': (e) => {
        updateSearch(Template.instance(), e.target.value);
    },
    'change #search': (e) => {
        updateSearch(Template.instance(), e.target.value);
    }
});

function getRowCount(template) {
    if (template.regEx.get() == '') {
        return 0;
    }

    const items = template.db.find(template.searchCriteria(template.regEx.get()).selector, {
        fields: {
            _id: 1
        }
    }).fetch();

    if (items.length == 0) {
        template.noResults.set(true);
    } else {
        template.noResults.set(false);
    }

    return items.length;
}

function getRows(template) {
    if (template.regEx.get() == '') {
        return [];
    }

    const searchCriteria = template.searchCriteria(template.regEx.get());

    return template.db.find(searchCriteria.selector, searchCriteria.options)
    .fetch()
    .map((item) => {
        for (var i = 0; i < template.getColumns.length; i++) {
            if (template.getColumns[i].dropdown != null) {
                const keys = [
                    'dropdowns',
                    template.getColumns[i].dropdown,
                    item[template.getColumns[i].name].toLowerCase()
                ];

                item[template.getColumns[i].name] = TAPi18n.__(keys.join('.'));
            }
        }

        return item;
    });
}

function reloadRowsIfIsUpdate(template) {
    if (!template.isLoading.get() && template.table != undefined) {
        const rowCount = getRowCount(template);

        if (template.itemCount.get() != rowCount) {
            template.itemCount.set(rowCount);
            template.table.loadRows(getRows(template));
        }
    }
}

function updateSearch(template, search) {
    if (template.searchString.get() !== search) {
        template.searchString.set(search);
        Session.set(FlowRouter.getRouteName() + '.searchString', search);

        if (search.length > 0) {
            if (search.length == 1 && (search == '*' || search == '?' || search == '%')) {
                template.searchString.set('.');
                template.regEx.set(new RegExp('.', 'i'));
            } else {
                template.regEx.set(new RegExp(search, 'i'));
            }
            doSubscribe(template);
        } else {
            template.awaitedCount.set(0)
            template.noResults.set(true);
            template.regEx.set('');
        }

        template.isLoading.set(true);
    }
}

function doSubscribe(template, retrieveAllResults = false) {
    if (template.handle !== null) {
        template.handle.stop();
    }

    const search = template.searchString.get();
    const projectId = FlowRouter.getParam('projectId');
    const limit = retrieveAllResults ? 0 : template.maxResultsShown;
    const routeName = FlowRouter.getRouteName();

    template.handle = Meteor.subscribe(routeName, search, projectId, limit);

    Counts.find(routeName, {
        fields: {
            count: 1
        }
    }).observeChanges({
        added: (id, fields) => {
            if (retrieveAllResults) {
                template.awaitedCount.set(fields.count)
            } else {
                template.awaitedCount.set(Math.min(template.maxResultsShown, fields.count));
            }
        }
    });
}
