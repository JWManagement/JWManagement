import { Meteor } from 'meteor/meteor'

const Platform = {

  getOS () {
    if (this.isAndroid()) {
      return 'md'
    } else {
      return 'ios'
    }
  },

  isCordova: Meteor.isCordova || true,

  isIOS: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i),

  isAndroid: navigator.userAgent.indexOf('Android') > 0
}

export default Platform
