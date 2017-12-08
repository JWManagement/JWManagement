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
    isTel(field) {
        return field.type == 'tel';
    },
    isEmail(field) {
        return field.type == 'email';
    },
    isArray(content) {
        return typeof(content.type) == 'object';
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
            } else if (content.type == 'date') {
                const dateFormat = TAPi18n.__(FlowRouter.getRouteName() + '.dateFormat');
                return moment(value, 'YYYYMMDD').format(dateFormat);
            } else {
                return value;
            }
        }
    },
    getProperty(entity, field) {
        if (field.key in entity) {
            if (field.type == 'date') {
                const dateFormat = TAPi18n.__(FlowRouter.getRouteName() + '.dateFormat');
                return moment(entity[field.key], 'YYYYMMDD').format(dateFormat);
            }
            return entity[field.key];
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

    template.handle = Meteor.subscribe(FlowRouter.getRouteName(), template.entityId, projectId);

    template.observeHandle = template.db.find({
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

    if (template.observeHandle !== null) {
        template.observeHandle.stop();
    }
});

Template.DetailsForm.events({
    'click .input': (e) => {
        const key = $(e.target).closest('.input').attr('key');
        FlowRouter.go(FlowRouter.current().path + '/' + key); // TODO: improve
    },
    'click tr': (e) => {
        const $tr = $(e.target).closest('tr.array-item');
        const entityKey = $tr.attr('entityKey');
        const entityId = $tr.attr('entityId');
        const entityLink = $tr.attr('entityLink');
        const params = FlowRouter.current().params;
        params[entityKey] = entityId;

        FlowRouter.go(FlowRouter.path(entityLink, params));
    }
});
