import './InsertForm.tpl.jade';
import './InsertForm.scss';

import './TextInput.js';
import './DateInput.js';

Template.InsertForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path(FlowRouter.getRouteName().replace('insert', 'search'), {
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
    'isText': () => {
        return Template.instance().inputType.get() == 'text';
    },
    'isDate': () => {
        return Template.instance().inputType.get() == 'date';
    },
    'isDropdown': () => {
        return Template.instance().inputType.get() == 'dropdown';
    }
});

Template.InsertForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.fields = data.fields;
});

Template.InsertForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'InsertForm');
});

Template.InsertForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});
