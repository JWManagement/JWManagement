export default MailManager = {

    sendMail: (data) => {
        data.data.global = {
            footer: TAPi18n.__('mail.footer', '', data.language),
            link: TAPi18n.__('mail.link', '', data.language)
        };

        Mailer.send({
            to: data.recipient,
            from: data.sender + ' <no-reply@jwmanagement.org>',
            replyTo: data.sender + '<' + data.from + '>',
            subject: data.subject,
            template: data.template,
            data: data.data
        });
    }

}
