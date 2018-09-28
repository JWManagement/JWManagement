import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.wiki.helpers({
  tabs: function() {
    var project, ref;
    project = Projects.findOne(FlowRouter.getParam('projectId'));
    return project != null ? (ref = project.wiki) != null ? ref.tabs : void 0 : void 0;
  },
  files: function() {
    var projectId;
    projectId = FlowRouter.getParam('projectId');
    return Files.find({
      projectId: projectId
    });
  },
  isReady: function() {
    return ProjectSubs.ready();
  },
  faqArgs: function(tabId, faq, index) {
    const instance = Template.instance();
    return {
      faq,
      tabId,
      moveFaq: function(direction, tabId, faqId) {
        Meteor.call('moveFaq', direction === 'up' ? -1 : 1, FlowRouter.getParam('projectId'), tabId, faqId);
      }
    };
  }
});

Template.wiki.onRendered(function() {
  var projectId;
  projectId = FlowRouter.getParam('projectId');
  return this.autorun(function() {
    var handle;
    handle = ProjectSubs.subscribe('wiki', projectId);
    handle.ready(Tracker.afterFlush(function() {
      $('.nav-tabs > li').removeClass('active');
      $('.nav-tabs > li:first').addClass('active');
      $('.tab-content .tab-pane:first').addClass('active');
      $('.summernote').summernote();
      return $('.note-editor').addClass('hidden');
    }));
    return FileSubs.subscribe('files', projectId);
  });
});

Template.wiki.events({
  'click .addTab': function() {
    var projectId;
    projectId = FlowRouter.getParam('projectId');
    return swalInput({
      swal: 'add.tab',
      doConfirm: function(inputValue) {
        return Meteor.call('addTab', projectId, inputValue);
      }
    });
  },
  'click .removeTab': function(e) {
    var tabId;
    tabId = this._id;
    return swalYesNo({
      swal: 'delete.tab',
      type: 'warning',
      doConfirm: function() {
        return Meteor.call('removeTab', FlowRouter.getParam('projectId'), tabId, function() {
          $('.nav-tabs li').first().addClass('active');
          return $('.tab-content .tab-pane').first().addClass('active');
        });
      }
    });
  },
  'click .editTab': function(e) {
    var tabId;
    tabId = this._id;
    $('#' + tabId + 'b .tab-title').addClass('hidden');
    $('#' + tabId + 'b .tab-edit').removeClass('hidden');
    return $('#' + tabId + 'b .changeTab').focus();
  },
  'blur .changeTab': function(e) {
    var tabId;
    tabId = this._id;
    $('#' + tabId + 'b .tab-edit').addClass('hidden');
    return $('#' + tabId + 'b .tab-title').removeClass('hidden');
  },
  'change .changeTab': function(e) {
    var projectId, tabId;
    projectId = FlowRouter.getParam('projectId');
    tabId = this._id;
    return Meteor.call('changeTab', projectId, tabId, $(e.target).val());
  },
  'click .addQuestion': function(e) {
    var projectId, tabId;
    projectId = FlowRouter.getParam('projectId');
    tabId = this._id;
    return swalInput({
      swal: 'add.question',
      doConfirm: function(inputValue) {
        return Meteor.call('addQuestion', projectId, inputValue, tabId, function(err, faqId) {
          return Tracker.afterFlush(function() {
            $('#' + faqId).find('.summernote').summernote();
            return $('.note-editor').addClass('hidden');
          });
        });
      }
    });
  },
  'change #uploadFile': function(e) {
    var doc;
    if (e.target.files.length > 0) {
      doc = new FS.File(e.target.files[0]);
      doc.projectId = FlowRouter.getParam('projectId');
      return Files.insert(doc, handleError);
    }
  },
  'click .removeFile': function(e) {
    var fileId, projectId;
    projectId = FlowRouter.getParam('projectId');
    fileId = this._id;
    return swalYesNo({
      swal: 'delete.file',
      type: 'warning',
      doConfirm: function() {
        return Meteor.call('removeFile', fileId, projectId);
      }
    });
  },
  'click .editFile': function() {
    var fileId, name, projectId;
    projectId = FlowRouter.getParam('projectId');
    fileId = this._id;
    name = this.name;
    return swalInput({
      swal: 'update.file',
      doConfirm: function(inputValue) {
        return Meteor.call('changeFileName', fileId, projectId, inputValue);
      }
    });
  }
});

