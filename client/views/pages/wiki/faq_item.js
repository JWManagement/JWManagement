import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import SimpleSchema from 'simpl-schema'

Template.faq_item.onCreated(function () {
  this.autorun(() => {
    new SimpleSchema({
      faq: Object,
      tabId: String,
      moveFaq: Function,
      'faq._id': String,
      'faq.question': String,
      'faq.answer': { type: String, optional: true }
    }).validate(Template.currentData())
  })

  this.editing = new ReactiveVar(false)

  this.toggleEditing = (editing) => {
    this.editing.set(editing)
    if (editing) {
      this.$('.note-editor').removeClass('hidden')
    } else {
      this.$('.note-editor').addClass('hidden')
    }
  }
})

Template.faq_item.helpers({
  hideWhenEditing () {
    return Template.instance().editing.get() && 'hidden'
  },
  hideWhenNotEditing () {
    return !Template.instance().editing.get() && 'hidden'
  }
})

Template.faq_item.events({
  'click .editQuestion': function (e, instance) {
    const projectId = FlowRouter.getParam('projectId')
    return swalInput({
      swal: 'update.question',
      doConfirm: function (inputValue) {
        Meteor.call('changeQuestion', projectId, instance.data.tabId, instance.data.faq._id, inputValue)
      }
    })
  },
  'click .js-move-faq-down': function (e, instance) {
    instance.data.moveFaq('down', instance.data.tabId, instance.data.faq._id)
  },
  'click .js-move-faq-up': function (e, instance) {
    instance.data.moveFaq('up', instance.data.tabId, instance.data.faq._id)
  },
  'click .removeFaq': function (e, instance) {
    const projectId = FlowRouter.getParam('projectId')
    return swalYesNo({
      swal: 'delete.question',
      type: 'warning',
      doConfirm: function () {
        Meteor.call('removeFaq', projectId, instance.data.tabId, instance.data.faq._id)
      }
    })
  },
  'click .editFaq': function (e, instance) {
    instance.toggleEditing(true)
  },
  'click .changeFaq': function (e, instance) {
    const code = instance.$('.summernote').summernote('code')
    const projectId = FlowRouter.getParam('projectId')
    Meteor.call('changeFaq', projectId, instance.data.tabId, instance.data.faq._id, code, function () {
      instance.toggleEditing(false)
    })
  },
  'click .cancelFaq': function (e, instance) {
    instance.toggleEditing(false)
  }
})
