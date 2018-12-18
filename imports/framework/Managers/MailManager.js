import { Mailer } from 'meteor/lookback:emails'
import i18next from 'i18next'

const MailManager = {

  sendMail (data) {
    const localTranslate = i18next.getFixedT(data.language)

    data.data.global = {
      footer: localTranslate('mail.footer'),
      link: localTranslate('mail.link')
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
