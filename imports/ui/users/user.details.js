import { Template } from 'meteor/templating'
import UserDetails from './UserDetails'

Template['user.details'].helpers({
  UserDetails: () => UserDetails
})
