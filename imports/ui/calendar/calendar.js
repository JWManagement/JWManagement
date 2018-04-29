import RoleManager from '/imports/api/managers/RoleManager.js';
import RouteManager from '/imports/api/managers/RouteManager.js';
import './calendar.jade';
import './calendar.scss';

Template.calendar.helpers({});

Template.calendar.onCreated(() => {
    const template = Template.instance();
});

Template.calendar.onRendered(() => {
    $('body').addClass('md-skin');
    $('body').addClass('top-navigation');
    $('body').attr('type', 'calendar');

    const template = Template.instance();
    const data = Template.currentData().data;

    template.sections = data.sections;
    template.backLink.set(data.backLink);
    template.getMethod = data.getMethod;

    template.isLoading.set(true);
    template.noResult.set(false);
    template.item.set({});

    loadData(template);

    window.scrollTo(0, 0);
});

Template.calendar.onDestroyed(() => {
    $('body').removeClass('md-skin');
    $('body').removeClass('top-navigation');
    $('body').attr('type', '');
});

Template.calendar.events({});

function loadData(template) {}
