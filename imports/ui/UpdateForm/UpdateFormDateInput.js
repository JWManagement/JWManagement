Template.UpdateFormDateInput.helpers({});

Template.UpdateFormDateInput.onCreated(() => {
    const template = Template.instance();
    const data = Template.currentData().data;

    template.valueRaw = data.value;
    template.dbFormat = data.dbFormat;
    template.updateForm = data.parentInstance;

    if (template.valueRaw != null && template.valueRaw == 'today') {
        template.valueRaw = moment(new Date()).format(template.dbFormat);
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
    .datepicker('setDate', moment(template.valueRaw, template.dbFormat).toDate())
    .on('changeDate', (e) => {
        const value = $('.datepicker').datepicker('getDate');
        let valueRaw = parseInt(moment(value, 'YYYY-MM-DD').format(template.dbFormat));

        if (value == '') {
            valueRaw = null;
        }

        if (valueRaw != template.valueRaw) {
            template.valueRaw = valueRaw;
            template.updateForm.updateEntity(valueRaw);
        }
    });

    $weekPicker.find('.table-condensed').removeClass('table-condensed');
});

Template.UpdateFormDateInput.onDestroyed(() => {});
