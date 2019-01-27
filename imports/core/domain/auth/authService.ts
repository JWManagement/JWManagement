import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

export class AuthService {
 constructor() {
   console.log('register method')
    Meteor.method('verifyCaptcha', this.verifyCaptcha)
 }

  verifyCaptcha(captchaResponse: string): string {
    console.log('verify')

    HTTP.call('POST', 'https://www.google.com/recaptcha/api/siteverify', {
      secret: '<secret>',
      response: captchaResponse
    }, (a, b, c, d, e) => {
      console.log(a)
      console.log(b)
      console.log(c)
      console.log(d)
      console.log(e)
    })

    return 'blubbels'
  }
}
