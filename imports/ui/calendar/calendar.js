import './calendar.tpl.jade';
import './calendar.scss';

Template.calendar.helpers({
    getShifts() {
        const template = Template.instance();
        return template.selectedDateShifts.get();
    }
});

Template.calendar.onCreated(() => {
    const template = Template.instance();
    template.loadShifts = loadShifts;
});

Template.calendar.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'calendar');

    const template = Template.instance();
    const $datePicker = template.$('#datepicker');
    let year = FlowRouter.getParam('year');
    let month = FlowRouter.getParam('month');
    let day = FlowRouter.getParam('day');

    if (year == null || month == null || day == null) {
        const today = moment();

        year = today.format('YYYY');
        month = today.format('MM');
        day = today.format('DD');

        FlowRouter.setParams({
            year: year,
            month: month,
            day: day
        });
    }

    template.selectedDate = new Date(year, month, day);

    $datePicker.datepicker({
        maxViewMode: 0,
        minViewMode: 0,
        weekStart: 1,
        templates: {
            leftArrow: '<i class="fa fa-chevron-left"></i>',
            rightArrow: '<i class="fa fa-chevron-right"></i>'
        },
        language: TAPi18n.getLanguage()
    })
    .on('changeDate', function(e) {
        template.selectedDate = e.date;
    })
    .datepicker('setDate', template.selectedDate);

    window.scrollTo(0, 0);
});

Template.calendar.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});

Template.calendar.events({});

function loadShifts() {
    const template = this;

    Meteor.call('calendar.getShifts', FlowRouter.current().params, (e, entity) => {
        console.log(e);
        console.log(entity);
    });
}
