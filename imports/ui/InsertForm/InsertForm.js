import './InsertForm.jade';
import './InsertForm.scss';

import './InsertFormTextInput.js';
import './InsertFormDateInput.js';
import './InsertFormDropdownInput.js';
import './InsertFormCheckboxInput.js';

Template.InsertForm.helpers({
    getBackLink() {
        return FlowRouter.path(FlowRouter.getRouteName().replace('insert', 'search'), FlowRouter.current().params);
    },
    getFields() {
        return Template.instance().fields;
    },
    isDate(field) {
        return field.type == 'date';
    },
    isDropdown(field) {
        return field.type == 'dropdown';
    },
    isCheckbox(field) {
        return field.type == 'checkbox';
    },
    getInputData() {
        const template = Template.instance();
        const currentData = Template.currentData();
        const errors = template.errors.get();
        let inputData = {
            key: currentData.key,
            parentInstance: template
        };

        errors.some((error) => {
            if (error.name == inputData.key) {
                inputData.error = error.type;
                return true;
            }
        });

        if (template.entity[inputData.key] != null &&
            template.entity[inputData.key] != '') {
            inputData.value = template.entity[inputData.key];
        }

        template.fields.some((field) => {
            if (field.key == inputData.key) {
                if ('default' in field) {
                    inputData.defaultValue = field.default;
                }
                if ('allowedValues' in field) {
                    inputData.allowedValues = field.allowedValues;
                }
                if ('allowedKeyValuesMethod' in field) {
                    inputData.allowedKeyValuesMethod = field.allowedKeyValuesMethod;
                }
                return true;
            }
        });

        return inputData;
    },
    isSaving() {
        return Template.instance().isSaving.get();
    }
});

Template.InsertForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.db = data.db;
    template.fields = data.fields;
    template.entity = {};
    template.errors = new ReactiveVar([]);
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
    'change input': (e) => {
        $(e.target).closest('.section').removeClass('has-error');
    },
    'change select': (e) => {
        $(e.target).closest('.section').removeClass('has-error');
    },
    'click .navbar-save': (e) => {
        e.preventDefault();

        const template = Template.instance();

        template.isSaving.set(true);

        Meteor.call(FlowRouter.getRouteName(), FlowRouter.current().params, template.entity, (e, entityId) => {
            template.isSaving.set(false);

            if (e != null) {
                if (e.error.error == 'validation-error') {
                    let errors = [];

                    if (e.error.reason != null) {
                        errors = errors.concat(e.error.reason);
                    } else if (e.error.details != null) {
                        errors = errors.concat(e.error.details);
                    }

                    template.errors.set(errors.map((error) => {
                        error.name = error.name.split('.').pop();
                        return error;
                    }));
                } else {
                    alert('SERVER ERROR');
                }
            } else {
                const routeNameParts = FlowRouter.getRouteName().split('.');
                routeNameParts.pop();

                Session.set(routeNameParts.concat(['search', 'searchString']).join('.'), entityId);

                routeNameParts.splice(1, 0, 'details');

                let params = FlowRouter.current().params;
                params.entityId = entityId;

                FlowRouter.go(routeNameParts.join('.'), params);
            }
        });
    }
});
