import './InsertForm.tpl.jade';
import './InsertForm.scss';

import './InsertFormTextInput.js';
import './InsertFormDateInput.js';

Template.InsertForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path(FlowRouter.getRouteName().replace('insert', 'search'), {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId')
        });
    },
    'getSections': () => {
        return Template.instance().sections;
    },
    'getTitle': (key) => {
        return TAPi18n.__('navigation.' + FlowRouter.getRouteName());
    },
    'getDetailTranslation': (key) => { // TODO: registerHelper
        return TAPi18n.__([
            FlowRouter.getRouteName().split('.')[0],
            'details',
            key
        ].join('.'));
    },
    'isText': (content) => {
        return !('dropdown' in content || content.type == Date);
    },
    'isDate': (content) => {
        return content.type == Date;
    },
    'isDropdown': (content) => {
        return 'dropdown' in content;
    },
    'textInputData': () => {
        return {
            key: Template.currentData().key,
            parentInstance: Template.instance()
        };
    },
    'dateInputData': () => {
        return {
            key: Template.currentData().key,
            parentInstance: Template.instance()
        };
    }
});

Template.InsertForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.sections = data.sections;
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
