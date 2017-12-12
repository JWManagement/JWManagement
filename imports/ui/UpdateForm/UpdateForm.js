import './UpdateForm.jade';
import './UpdateForm.scss';

import './UpdateFormTextInput.js';
import './UpdateFormDateInput.js';
import './UpdateFormDropdownInput.js';

Template.UpdateForm.helpers({
    getBackLink() {
        return FlowRouter.path(Template.instance().backLink.get(), FlowRouter.current().params);
    },
    isReady() {
        return !Template.instance().isLoading.get() && !Template.instance().noResult.get();
    },
    isText() {
        return Template.instance().inputData.get().type == 'text';
    },
    isDate() {
        return Template.instance().inputData.get().type == 'date';
    },
    isDropdown() {
        return Template.instance().inputData.get().type == 'dropdown';
    },
    getInputData() {
        return Template.instance().inputData.get();
    }
});

Template.UpdateForm.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.backLink = new ReactiveVar('');
    template.isLoading = new ReactiveVar(true);
    template.noResult = new ReactiveVar(true);
    template.inputData = new ReactiveVar({});
    template.inputType = new ReactiveVar('');

    template.updateEntity = (value) => {
        const routeName = FlowRouter.getRouteName();
        const params = FlowRouter.current().params;
        const key = FlowRouter.getParam('key');

        Meteor.call(routeName, params, key, value, (e) => {
            if (e != null) {
                if (e.error.error == 'validation-error' && e.error.reason.length > 0) {
                    let inputData = template.inputData.get();
                    inputData.error = e.error.reason[0].type;
                    template.inputData.set(inputData);
                } else {
                    alert('SERVER ERROR')
                }
            }
        });
    }
});

Template.UpdateForm.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'UpdateForm');

    const template = Template.instance();
    const data = Template.currentData().data;

    template.backLink.set(data.backLink);
    template.isLoading.set(true);
    template.noResult.set(true);
    template.inputData.set({ parentInstance: template });

    Meteor.call(data.getMethod, FlowRouter.current().params, (e, value) => {
        if (e == null) {
            let inputData = template.inputData.get();
            inputData.value = value;
            template.inputData.set(inputData);
            template.noResult.set(false);
            template.isLoading.set(false);
        } else {
            alert('SERVER ERROR')
        }
    });

    data.fields.some((field) => {
        if (field.key == FlowRouter.getParam('key')) {
            let inputData = template.inputData.get();
            inputData.type = 'text';

            if (field.type == 'dropdown') {
                inputData.type = 'dropdown';

                if ('allowedValues' in field) {
                    inputData.allowedValues = field.allowedValues;
                } else if ('allowedKeyValuesMethod' in field) {
                    inputData.allowedKeyValuesMethod = field.allowedKeyValuesMethod;
                }
            } else if (field.type == 'date') {
                inputData.type = 'date';
            }

            template.inputData.set(inputData);
            return true;
        }
    });
});

Template.UpdateForm.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});

Template.UpdateForm.events({
    'submit form': (e) => {
        e.preventDefault();
    }
});
