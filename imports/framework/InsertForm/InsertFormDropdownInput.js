Template.InsertFormDropdownInput.helpers({
  isAllowedValues() {
    const template = Template.instance();
    return template.allowedValues != null;
  },
  isAllowedKeyValues() {
    const template = Template.instance();
    return template.allowedKeyValues != null;
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
    const template = Template.instance();
    const data = Template.currentData();
    return template.key + 'Values.' + data;
  }
});

Template.InsertFormDropdownInput.onCreated(() => {
  const template = Template.instance();
  const data = Template.currentData().data;

  template.key = data.key;
  template.value = data.value;
  template.insertForm = data.parentInstance;
  template.allowedValues = data.allowedValues;
  template.allowedKeyValuesMethod = data.allowedKeyValuesMethod;
  template.allowedKeyValues = new ReactiveVar(data.allowedKeyValues || []);

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

Template.InsertFormDropdownInput.onRendered(() => {
  const template = Template.instance();

  Tracker.afterFlush(() => {
    template.$('select').val(template.value);
  });
});

Template.InsertFormDropdownInput.onDestroyed(() => {});

Template.InsertFormDropdownInput.events({
  'change select': (e, template) => {
    const value = $(e.target).val();

    template.insertForm.setFieldValue(template.key, value);
  }
});
