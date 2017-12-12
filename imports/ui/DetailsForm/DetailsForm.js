import './DetailsForm.jade';
import './DetailsForm.scss';

Template.DetailsForm.helpers({
    getBackLink() {
        return FlowRouter.path(Template.instance().backLink.get(), FlowRouter.current().params);
    },
    getTranslation(key) {
        return TAPi18n.__(FlowRouter.getRouteName() + '.' + key);
    },
    getActionPath(action) {
        return FlowRouter.path(action.route, FlowRouter.current().params);
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
        const item = template.item.get();

        if (key in item) {
            const value = item[key];
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

    template.sections = [];
    template.backLink = new ReactiveVar('');
    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(false); // TODO: is this working?
    template.item = new ReactiveVar({});
});

Template.DetailsForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'DetailsForm');

    const template = Template.instance();
    const data = Template.currentData().data;

    template.sections = data.sections;
    template.backLink.set(data.backLink);
    template.isLoading.set(true);
    template.noResult.set(false);
    template.item.set({});

    Meteor.call(data.getMethod, FlowRouter.current().params, (e, entity) => {
        if (e == null) {
            template.item.set(entity);
            template.noResult.set(false);
            template.isLoading.set(false);
        } else {
            alert('SERVER ERROR')
        }
    });
});

Template.DetailsForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});

Template.DetailsForm.events({
    'click .input': (e) => {
        const updateLink = FlowRouter.getRouteName().replace('details', 'update');
        const params = FlowRouter.current().params;
        params.key = $(e.target).closest('.input').attr('key');

        FlowRouter.go(FlowRouter.path(updateLink, params));
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
