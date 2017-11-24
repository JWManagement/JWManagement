import './DetailsForm.tpl.jade';
import './DetailsForm.scss';

Template.DetailsForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path(FlowRouter.getRouteName().replace('details', 'search'), {
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
    'getEntityTranslation': (key) => {
        return TAPi18n.__(FlowRouter.getRouteName().replace('details', 'entity.') + key);
    },
    'isArray': (content) => {
        return typeof(content.type) == 'object';
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
    'getValue': (content) => {
        const template = Template.instance();
        const key = content.key;

        if (key in template.item.get()) {
            const value = template.item.get()[key];

            if (content.dropdown != null) {
                const keys = [
                    'dropdowns',
                    content.dropdown,
                    value.toLowerCase()
                ];

                return TAPi18n.__(keys.join('.'));
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
    template.itemId = '';
    template.item = new ReactiveVar({});
});

Template.DetailsForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'DetailsForm');

    const template = Template.instance();

    template.isLoading.set(true);
    template.noResult.set(false);

    template.itemId = FlowRouter.getParam('itemId');
    const projectId = FlowRouter.getParam('projectId');
    const routeName = FlowRouter.getRouteName().split('.')[0];

    template.handle = Meteor.subscribe(routeName, template.itemId, projectId);

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
        FlowRouter.go(FlowRouter.current().path + '/' + key);
    }
});
