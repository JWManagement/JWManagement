Template.UpdateFormPickerInput.helpers({
    isAllowedValues() {
        const template = Template.instance();
        return template.allowedValues != null;
    },
    isAllowedKeyValues() {
        const template = Template.instance();
        return template.allowedKeyValuesMethod != null;
    },
    getItems() {
        const template = Template.instance();
        return template.allowedValues;
    },
    getKeyValues() {
        const template = Template.instance();
        return template.allowedKeyValues.get();
    },
    getItemKey() {
        const item = Template.currentData();
        return FlowRouter.getParam('key') + 'Values.' + item;
    },
    isChecked(keyValue) {
        const template = Template.instance();
        return keyValue == template.value.get();
    },
    getSearchEnabledClass() {
        const data = Template.currentData().data;

        if (data.search == true) {
            return 'search-enabled';
        } else {
            return 'search-disabled';
        }
    }
});

Template.UpdateFormPickerInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.value = new ReactiveVar(data.value);
    template.updateForm = data.parentInstance;
    template.allowedValues = data.allowedValues;
    template.allowedKeyValuesMethod = data.allowedKeyValuesMethod;
    template.allowedKeyValues = new ReactiveVar([]);

    if (template.allowedKeyValuesMethod != null) {
        Meteor.call(template.allowedKeyValuesMethod, FlowRouter.current().params, (e, keyValues) => {
            if (e == null) {
                template.allowedKeyValues.set(keyValues);
            } else {
                alert('SERVER ERROR');
            }
        });
    }
});

Template.UpdateFormPickerInput.onRendered(() => {});

Template.UpdateFormPickerInput.onDestroyed(() => {});

Template.UpdateFormPickerInput.events({
    'click .form-group': (e, template) => {
        const value = $(e.target).closest('.form-group').attr('key');
        template.updateForm.updateEntity(value);
        template.value.set(value);
    }
});
