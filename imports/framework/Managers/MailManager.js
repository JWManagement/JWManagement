import { Mailer } from 'meteor/lookback:emails'
import i18next from 'i18next'

const MailManager = {

  sendMail (data) {
    data.data.global = {
      footer: i18next.t('mail.footer', '', data.language),
      link: i18next.t('mail.link', '', data.language)
    }

    Mailer.send({
      to: data.recipient,
      from: data.sender + ' <no-reply@jwmanagement.org>',
      replyTo: data.sender + '<' + data.from + '>',
      subject: data.subject,
      template: data.template,
      data: data.data
    })
  }

}

export default MailManager
