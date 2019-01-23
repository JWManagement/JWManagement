Template.registerHelper 'win2html', (text) -> text?.replace(/\r\n|\n|\r/g, '<br>')

Template.registerHelper 'html2win', (text) -> text?.replace(/<br.?.?>/g, '\r\n')
