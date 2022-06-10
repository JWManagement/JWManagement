import { Template } from 'meteor/templating'
import Permissions from '../../framework/Constants/Permissions'

Template['dashboard.details'].onCreated(() => {
  console.log(Meteor.user());
  // Meteor.call('updateProfile', 'acceppteddsgvo', "0")
  if (Meteor.user().profile.acceppteddsgvo !== "1") {
    var tag = document.createElement("div");
    tag.id = "div-elena";
    tag.style.width = "10000px";
    tag.style.height = "10000px";
    tag.style.position = "fixed";
    tag.style.zIndex = 1;
    tag.style.left = 0;
    tag.style.top = 0;
    tag.style.overflow = "auto";
    tag.style.backgroundColor = "white";
    tag.style.marginTop = "50px";

    var p = document.createElement("p");
    p.style.color = "black";
    p.style.margin = "100px";

    p.innerHTML = '<div><p>Bitte bestätigen sie, dass Sie die Datenschutz-Erklärungen zur Kenntnis genommen haben und diesen zustimmen.</p><button id="bestaetige-elena">Ich bestätige dies.</button></div>';

    tag.appendChild(p);

    var element = document.getElementById("__blaze-root");

    element.appendChild(tag);

    $("#bestaetige-elena").on("click", function () {
      $('#div-elena').hide();
      Meteor.call('updateProfile', 'acceppteddsgvo', "1")
      console.log(Meteor.user());
    });
  }
})

Template['dashboard.details'].helpers({
  data: {
    getMethod: 'dashboard.get',
    navigation: {},
    sections: [{
      title: 'myProjects',
      contents: [{
        key: 'myProjects',
        type: 'array',
        maxItemsShown: 5,
        allItemsRoute: 'dashboard.myProjects.details',
        item: {
          key: 'project',
          type: 'link',
          icon: 'group',
          action: {
            type: 'route',
            route: 'project.details'
          }
        }
      }]
    }, {
      title: 'missingShiftReports',
      contents: [{
        key: 'missingShiftReports',
        type: 'array',
        maxItemsShown: 1,
        allItemsRoute: 'dashboard.missingShiftReports.details',
        item: {
          key: 'shift',
          link: 'shift.details',
          icon: 'announcement',
          type: 'entity',
          rows: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'date',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'date',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }
      }]
    }, {
      title: 'upcomingShifts',
      contents: [{
        key: 'upcomingShifts',
        type: 'array',
        maxItemsShown: 3,
        allItemsRoute: 'dashboard.upcomingShifts.details',
        item: {
          key: 'shift',
          link: 'shift.details',
          icon: 'event_available',
          type: 'entity',
          rows: [{
            key: 'tag'
          }, {
            key: 'date',
            type: 'date',
            dbFormat: 'YYYYMMDD',
            uiFormat: 'date'
          }, {
            key: 'start',
            type: 'date',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }, {
            key: 'end',
            type: 'date',
            dbFormat: 'Hmm',
            uiFormat: 'time'
          }]
        }
      }]
    }, {
      title: 'otherShifts',
      contents: [{
        key: 'pendingRequests.link',
        type: 'link',
        route: 'dashboard.pendingRequests.details',
        icon: 'hourglass_empty'
      }, {
        key: 'olderShifts.link',
        type: 'link',
        route: 'dashboard.olderShifts.details',
        icon: 'event_available'
      }]
    }, {
      title: 'administration',
      contents: [{
        key: 'profile',
        type: 'link',
        route: 'profile',
        icon: 'account_circle'
      }, {
        key: 'language',
        type: 'link',
        route: 'language.details',
        icon: 'translate'
      }, {
        key: 'projects',
        type: 'link',
        route: 'project.search',
        icon: 'view_module',
        canSee: Permissions.support
      }, {
        key: 'users',
        type: 'link',
        route: 'user.search',
        icon: 'group',
        canSee: Permissions.support
      }, {
        key: 'onlineUsers',
        type: 'link',
        route: 'users.online.details',
        icon: 'group',
        canSee: Permissions.support
      }, {
        key: 'adminEmails',
        type: 'link',
        route: 'users.adminEmails.details',
        icon: 'mail',
        canSee: Permissions.support
      }, {
        key: 'startProject',
        type: 'link',
        route: 'project.insert',
        icon: 'add_circle_outline'
      }]
    }, {
      title: 'account',
      contents: [{
        key: 'logout',
        type: 'link',
        route: 'logout',
        icon: 'power_settings_new'
      }]
    }]
  }
})
