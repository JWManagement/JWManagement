import './InsertForm.tpl.jade';
import './InsertForm.scss';

import './InsertFormTextInput.js';
import './InsertFormDateInput.js';
import './InsertFormDropdownInput.js';

Template.InsertForm.helpers({
    'getBackLink': () => {
        return FlowRouter.path(FlowRouter.getRouteName().replace('insert', 'search'), {
            language: FlowRouter.getParam('language'),
            projectId: FlowRouter.getParam('projectId')
        });
    },
    'getFields': () => {
        return Template.instance().fields;
    },
    'isText': (field) => {
        return !('dropdown' in field || field.type == Date);
    },
    'isDate': (field) => {
        return field.type == Date;
    },
    'isDropdown': (field) => {
        return 'dropdown' in field;
    },
    'getInputData': () => {
        return {
            key: Template.currentData().key,
            parentInstance: Template.instance()
        };
    },
    'isSaving': () => {
        return Template.instance().isSaving.get();
    }
});

Template.InsertForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.fields = data.fields;
    template.entity = {};
    template.isSaving = new ReactiveVar(false);

    template.setFieldValue = (key, value) => {
        template.entity[key] = value;
    }
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

Template.InsertForm.events({
    'click .navbar-save': (e) => {
        e.preventDefault();

        const template = Template.instance();

        template.isSaving.set(true);

        Meteor.call(FlowRouter.getRouteName(), template.entity, (e) => {
            //template.isSaving.set(false);

            if (e != null) {
                if (e.error.error == 'validation-error') {
                    template.errors.set(e.error.details);
                    console.log(template.errors.get());
                } else {
                    alert('SERVER ERROR')
                }
            }
        });
    }
});
