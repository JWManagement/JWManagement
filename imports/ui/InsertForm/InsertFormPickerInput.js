Template.InsertFormPickerInput.helpers({
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
        return template.allowedValues.map((item) => {
            return '' + item;
        });
    },
    getKeyValues() {
        const template = Template.instance();
        return template.allowedKeyValues.get();
    },
    getItemKey() {
        const template = Template.instance();
        return template.key + 'Values.' + this;
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

Template.InsertFormPickerInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.value = new ReactiveVar(data.value);
    template.insertForm = data.parentInstance;
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

Template.InsertFormPickerInput.onRendered(() => {});

Template.InsertFormPickerInput.onDestroyed(() => {});

Template.InsertFormPickerInput.events({
    'click .form-group': function(e, template) {
        const key = $(e.target).closest('.section').attr('key');
        const value = $(e.target).closest('.form-group').attr('key');

        template.insertForm.setFieldValue(key, value);
        template.value.set(value);
    }
});
