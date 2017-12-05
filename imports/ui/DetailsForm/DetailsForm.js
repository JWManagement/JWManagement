import './DetailsForm.jade';
import './DetailsForm.scss';

Template.DetailsForm.helpers({
    getBackLink() {
        return FlowRouter.path(FlowRouter.getRouteName().replace('details', 'search'), FlowRouter.current().params);
    },
    getTranslation(key) {
        return TAPi18n.__(FlowRouter.getRouteName() + '.' + key);
    },
    getActionPath(action) {
        return FlowRouter.current().path + '/' + action.path;
    },
    isButton(action) {
        return action.type == 'link';
    },
    isArray(content) {
        return typeof(content.type) == 'object';
    },
    getArrayElements(content) {
        const template = Template.instance();
        if (template.item.get()[content.key] != null) {
            return template.item.get()[content.key];
        }
        return []; // TODO: fix
    },
    getArrayTranslation(array, key) {
        return TAPi18n.__([
            FlowRouter.getRouteName().split('.')[0],
            'entity',
            array,
            key
        ].join('.'));
    },
    isLoading() {
        return Template.instance().isLoading.get();
    },
    noResult() {
        return Template.instance().noResult.get();
    },
    sections() {
        return Template.instance().sections;
    },
    getValue(content) {
        const template = Template.instance();
        const key = content.key;

        if (key in template.item.get()) {
            const value = template.item.get()[key];

            if (content.type == 'dropdown') {
                return TAPi18n.__([
                    FlowRouter.getRouteName().split('.')[0],
                    'entity',
                    key + 'Values',
                    value.toLowerCase()
                ].join('.'));
            } else if (content.type == Date) {
                return moment(value).format('DD.MM.YYYY');
            } else {
                return value;
            }
        }
    }
});

Template.DetailsForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.sections = data.sections;

    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.language = '';
    template.handle = null;
    template.entityId = '';
    template.item = new ReactiveVar({});
});

Template.DetailsForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'DetailsForm');

    const template = Template.instance();

    template.isLoading.set(true);
    template.noResult.set(false);

    template.entityId = FlowRouter.getParam('entityId');
    const projectId = FlowRouter.getParam('projectId');
    const routeName = FlowRouter.getRouteName().split('.')[0];

    template.handle = Meteor.subscribe(routeName, template.entityId, projectId);

    template.changeObserver = template.db.find({
        _id: template.entityId
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

    const template = Template.instance();

    if (template.handle !== null) {
        template.handle.stop();
    }

    if (template.changeObserver !== null) {
        template.changeObserver.stop();
    }
});

Template.DetailsForm.events({
    'click .input': (e) => {
        const key = $(e.target).closest('.input').attr('key');
        FlowRouter.go(FlowRouter.current().path + '/' + key); // TODO: improve
    }
});
