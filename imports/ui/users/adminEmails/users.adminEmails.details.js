import { Template } from 'meteor/templating'
import AdminEmails from './AdminEmails'

Template['users.adminEmails.details'].helpers({
  AdminEmails: () => AdminEmails
})
