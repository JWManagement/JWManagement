import { Meteor } from 'meteor';
import { FlowRouter } from 'meteor/kadira:flowrouter';

function Delay(param) {
  return Meteor.setTimeout(function() {
    return param();
  }, 0);
}

function wrs(param) {
  return Meteor.setTimeout(function() {
    return FlowRouter.withReplaceState(function() {
      return param();
    });
  }, 0);
}

export { Delay, wrs };
