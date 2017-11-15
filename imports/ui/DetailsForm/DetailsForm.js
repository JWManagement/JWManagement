import './DetailsForm.tpl.jade';
import './DetailsForm.scss';

Template.DetailsForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path(FlowRouter.getRouteName().replace('details', 'search'), {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId')
        });
    },
    'getTranslation': (key) => {
        return TAPi18n.__(FlowRouter.getRouteName() + '.' + key);
    },
    'getEntityTranslation': (key) => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('details', 'entity.') + key);
    },
    'isLoading': () => {
        return Template.instance().isLoading.get();
    },
    'noResult': () => {
        return Template.instance().noResult.get();
    },
    'sections': () => {
        return Template.instance().sections;
    },
    'getValue': (key) => {
        return Template.instance().item.get()[key];
    },
    'getItemKeyDropdown': (key, container) => {
        var template = Template.instance();
        return TAPi18n.__(FlowRouter.getRouteName().replace('details', 'entity.') + container + '.' + template.item.get()[key]);
    },
    'isDate': (elem) => {
        return elem.type == 'date';
    }
});

Template.DetailsForm.onCreated(() => {
    var template = Template.instance();
    var data = Template.currentData().data;

    template.db = data.db;
    template.publicationName = data.publicationName;
    template.sections = data.sections;

    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.language = '';
    template.handle = null;
    template.itemId = '';
    template.item = new ReactiveVar({});
});
Template.DetailsForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'DetailsForm');

    var template = Template.instance();

    template.isLoading.set(true);
    template.noResult.set(false);

    template.itemId = FlowRouter.getParam('itemId');
    var projectId = FlowRouter.getParam('projectId');

    template.handle = Meteor.subscribe(template.publicationName, template.itemId, projectId);

    template.changeObserver = template.db.find({
        _id: template.itemId
    }).observe({
        added: (newItem) => {
            template.noResult.set(false);
            template.item.set(newItem);
        },
        changed: (oldItem, newItem) => {
            template.item.set(newItem);
        }
    });

    Tracker.autorun((tracker) => {
        if (template.handle.ready()) {
            template.isLoading.set(false);
            tracker.stop();
        }
    });
});

Template.DetailsForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');

    var template = Template.instance();

    if (template.handle !== null) {
        template.handle.stop();
    }

    if (template.changeObserver !== null) {
        template.changeObserver.stop();
    }
});

Template.DetailsForm.events({
    'click .input': (e) => {
        var key = $(e.target).closest('.input').attr('key');
        FlowRouter.go(FlowRouter.current().path + '/' + key);
    }
});
