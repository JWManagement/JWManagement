import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { TAPi18n } from 'meteor/tap:i18n';
import { FlowRouter } from 'meteor/kadira:flow-router';

import RouteManager from '/imports/framework/Managers/RouteManager';
import { getTitle } from '/imports/framework/Helpers/Helpers';

import './SearchForm.jade';
import './SearchForm.scss';

Template.SearchForm.helpers({
  getTitle,
  getBackLink() {
    return FlowRouter.path(Template.instance().backLink, FlowRouter.current().params);
  },
  getTranslation(key) {
    return TAPi18n.__(FlowRouter.getRouteName() + '.' + key.replace(/_/g, '.'));
  },
  valueOrDash(value) {
    return (value != '' ? value : '-');
  },
  isLoading() {
    return Template.instance().isLoading.get();
  },
  noResults() {
    const template = Template.instance();
    return !template.isLoading.get() && template.items.get().length == 0;
  },
  resultsMobile() {
    const template = Template.instance();
    return template.mobileRows.get();
  },
  moreResultsAvailable() {
    const template = Template.instance();
    const resultsShown = template.resultsShown.get();
    return template.itemCount.get() > resultsShown && resultsShown > 0;
  },
  totalFound() {
    const template = Template.instance();
    return template.itemCount.get();
  },
  resultsShown() {
    return Template.instance().resultsShown.get();
  },
  allowCreate() {
    return Template.instance().allowCreate;
  },
  isCreating() {
    return Template.instance().isCreating.get();
  }
});

Template.SearchForm.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.translatedAttributes = data.translatedAttributes;
  template.searchCriteria = data.searchCriteria;
  template.columnDefinitions = data.columns;
  template.entityId = data.entityId;
  template.backLink = data.backLink;
  template.allowCreate = data.allowCreate;

  template.searchString = new ReactiveVar(Session.get(FlowRouter.getRouteName() + '.searchString') || '');
  template.isLoading = new ReactiveVar(false);
  template.isCreating = new ReactiveVar(false);
  template.itemCount = new ReactiveVar(0);
  template.items = new ReactiveVar([]);
  template.regEx = new ReactiveVar(new RegExp(''));
  template.table = null;
  template.defaultResultsPerPage = 20;
  template.resultsShown = new ReactiveVar(template.defaultResultsPerPage);

  template.rows = [];
  template.mobileRows = new ReactiveVar([]);
});

Template.SearchForm.onRendered(() => {
  $('body').addClass('md-skin');
  $('body').addClass('top-navigation');
  $('body').attr('type', 'SearchForm');

  const template = Template.instance();
  const columns = template.columnDefinitions.map((column) => {
    let routeParts = FlowRouter.getRouteName().split('.');
    routeParts.pop();
    const translationString = routeParts.concat(['entity', column.name]).join('.').replace(/_/g, '.');

    column.title = TAPi18n.__(translationString);
    return column;
  });

  template.autorun(() => {
    Tracker.afterFlush(() => {
      $('#table').html('');

      template.table = FooTable.init('#table', {
        columns: columns,
        rows: template.rows,
        empty: '',
        showToggle: false,
        paging: {
          enabled: true,
          size: template.defaultResultsPerPage
        },
        sorting: {
          enabled: true
        }
      });
    });
  });

  const searchString = template.searchString.get();
  $('#search').val(searchString);
  template.searchString.set(null);

  updateSearch(template, searchString);
});

Template.SearchForm.onDestroyed(() => {
  $('body').removeClass('md-skin');
  $('body').removeClass('top-navigation');
  $('body').attr('type', '');
});

Template.SearchForm.events({
  'click #more': (e, template) => {
    doSearch(template, true);
  },
  'click .results-desktop tbody tr:not(.footable-empty)': (e, template) => {
    const entityId = $(e.target).closest('tr').find('td').first().html();

    RouteManager.navigateToDetails(template.entityId, entityId);
  },
  'click .navbar-create': () => {
    RouteManager.navigateToInsert();
  },
  'keyup #search': (e, template) => {
    updateSearch(template, e.target.value);
  },
  'change #search': (e, template) => {
    updateSearch(template, e.target.value);
  }
});

function generateRows(template) {
  template.rows = template.items.get().map((item) => {
    const row = {};

    template.columnDefinitions.forEach((column) => {
      let value = null;

      if (column.name.indexOf('_') > 0) {
        let tmp = item;

        for (let property of column.name.split('_')) {
          tmp = tmp[property];
        }

        value = tmp;
      } else {
        value = item[column.name];
      }

      if (column.type == 'dropdown') {
        const keys = [
          FlowRouter.getRouteName().split('.')[0],
          'entity',
          column.name + 'Values',
          item[column.name].toLowerCase()
        ];

        value = TAPi18n.__(keys.join('.').replace(/_/g, '.'));
      }

      row[column.name] = value;
    });

    return row;
  });

  const mobileColumns = template.columnDefinitions
    .filter((column) => {
      return column.mobile == true;
    })
    .map((column) => {
      return {
        name: column.name,
        translation: TAPi18n.__([
          FlowRouter.getRouteName().split('.')[0],
          'entity',
          column.name
        ].join('.').replace(/_/g, '.'))
      };
    });

  template.mobileRows.set(template.rows.map((row) => {
    return {
      link: FlowRouter.path(
        RouteManager.getLink('details'),
        RouteManager.getParams(template.entityId, row._id)),
      columns: mobileColumns.map((column) => {
        return {
          th: column.translation,
          td: row[column.name]
        };
      })
    };
  }));
}

function updateSearch(template, search) {
  if (template.searchString.get() !== search) {
    template.searchString.set(search);
    Session.set(FlowRouter.getRouteName() + '.searchString', search);

    if (search == '' || search == '*' || search == '?' || search == '%') {
      template.searchString.set('.');
      template.regEx.set(new RegExp('.', 'i'));
    } else {
      template.regEx.set(new RegExp(search, 'i'));
    }

    doSearch(template);
  }
}

function doSearch(template, retrieveAllResults = false) {
  template.isLoading.set(false);

  const routeName = FlowRouter.getRouteName();
  let params = FlowRouter.current().params;
  params.searchString = template.searchString.get();
  params.limit = retrieveAllResults ? 0 : template.defaultResultsPerPage;
  template.resultsShown.set(params.limit);

  Meteor.call(routeName, params, (e, r) => {
    if (e != null) {
      alert(e); return;
    }

    if (r != null) {
      template.items.set(r.items);
      template.itemCount.set(r.total);
      template.isLoading.set(false);

      generateRows(template);
    }
  });
}
