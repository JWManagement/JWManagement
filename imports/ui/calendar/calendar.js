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

    template.selectedDate = Date();
    template.selectedDateShifts = new ReactiveVar([]);


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
    .datepicker('setDate', Date());

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
