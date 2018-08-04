import moment from 'moment';

import './calendar.tpl.jade';
import './calendar.scss';

Template.calendar.helpers({
  isLoading() {
    const template = Template.instance();
    return template.isLoading.get();
  },
  getShifts() {
    const template = Template.instance();
    return template.selectedDateShifts.get();
  },
  getFormattedTime(time) {
    return moment(time, 'Hmm').format(TAPi18n.__('timeFormat.time'));
  },
  hasNoRequests() {
    return this.approvedRequests == 0 && this.pendingRequests == 0;
  }
});

Template.calendar.onCreated(() => {
  const template = Template.instance();

  template.selectedDate = Date();
  template.selectedDateShifts = new ReactiveVar([]);
  template.loadShifts = loadShifts;
  template.setDate = setDate;

  template.isLoading = new ReactiveVar(true);
});

Template.calendar.onRendered(() => {
  $('body').attr('type', 'calendar');

  const template = Template.instance();
  const $datePicker = template.$('#datepicker');
  let year = FlowRouter.getParam('year');
  let month = FlowRouter.getParam('month');
  let day = FlowRouter.getParam('day');

  if (year == null || month == null || day == null) {
    template.setDate(new Date());
  } else {
    template.setDate(new Date(year, month - 1, day));
  }

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
    template.setDate(e.date);
    template.loadShifts();
  })
  .datepicker('setDate', template.selectedDate);

  window.scrollTo(0, 0);
});

Template.calendar.onDestroyed(() => {
  $('body').attr('type', '');
});

Template.calendar.events({
  'click .shift': function(e) {
    wrs(() => {
      FlowRouter.setQueryParams({
        showShift: this._id
      });
    });
  }
});

function loadShifts() {
  const template = this;
  let params = FlowRouter.current().params;
  params.date = parseInt(moment(template.selectedDate).format('YYYYDDD'));

  template.isLoading.set(true);

  Meteor.call('calendar.getShifts', params, (e, shifts) => {
    template.selectedDateShifts.set(shifts);
    template.isLoading.set(false);
  });
}

function setDate(date) {
  const template = this;
  template.selectedDate = date;
  date = moment(date);

  wrs(() => {
    FlowRouter.setParams({
      year: date.format('YYYY'),
      month: date.format('MM'),
      day: date.format('DD')
    });
  });
}
