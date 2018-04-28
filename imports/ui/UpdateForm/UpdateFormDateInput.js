Template.UpdateFormDateInput.helpers({});

Template.UpdateFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.valueRaw = data.value;
    template.format = data.format;
    template.updateForm = data.parentInstance;

    if (template.valueRaw != null && template.valueRaw == 'today') {
        template.valueRaw = moment(new Date()).format(template.format);
    }
});

Template.UpdateFormDateInput.onRendered(() => {
    const template = Template.instance();
    const $weekPicker = $('.datepicker');

    $weekPicker.datepicker({
        maxViewMode: 0,
        weekStart: 1,
        language: TAPi18n.getLanguage()
    })
    .on('changeDate', (e) => {
        const value = $('.datepicker').datepicker('getDate');
        let valueRaw = parseInt(moment(value, 'YYYY-MM-DD').format(template.format));

        if (value == '') {
            valueRaw = null;
        }

        if (valueRaw != template.valueRaw) {
            template.valueRaw = valueRaw;
            template.updateForm.updateEntity(valueRaw);
        }
    });

    if (template.valueRaw != '') {
        $weekPicker.datepicker('setDate', moment(template.valueRaw, template.format).toDate())
    }

    $weekPicker.find('.table-condensed').removeClass('table-condensed');
});

Template.UpdateFormDateInput.onDestroyed(() => {});
