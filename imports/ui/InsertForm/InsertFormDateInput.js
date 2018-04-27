Template.InsertFormDateInput.helpers({
    isRequired() {
        const data = Template.currentData().data;
        if (data.required != null) {
            return data.required;
        }
        return false;
    }
});

Template.InsertFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.key = data.key;
    template.format = data.format;
    template.insertForm = data.parentInstance;

    if (data.defaultValue != null) {
        if (data.defaultValue == 'today') {
            template.defaultValue = Date();
        } else {
            template.defaultValue = data.defaultValue;
        }
    }
});

Template.InsertFormDateInput.onRendered(() => {
    const template = Template.instance();

    template.$('.datepicker').datepicker({
        maxViewMode: 0,
        weekStart: 1,
        language: TAPi18n.getLanguage()
    })
    .datepicker('setDate', template.defaultValue)
    .on('changeDate', (e) => {
        const valueRaw = template.$('.datepicker').datepicker('getDate');
        const value = parseInt(moment(valueRaw, 'YYYY-MM-DD').format(template.format));

        template.insertForm.setFieldValue(template.key, value);
    });
});

Template.InsertFormDateInput.onDestroyed(() => {});
