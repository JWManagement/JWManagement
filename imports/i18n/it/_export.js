import dashboard from './dashboard'
import calendar from './calendar'
import error from './errors'
import framework from './framework'
import language from './language'
import mail from './mail'
import misc from './misc'
import modal from './modals'
import navigation from './navigation'
import note from './notes'
import pages from './pages'
import project from './project'
import publisher from './publishers'
import shift from './shift'
import swal from './swals'
import user from './user'
import users from './users'

const it = {
  calendar,
  dashboard,
  error,
  ...framework,
  language,
  mail,
  ...misc,
  modal,
  navigation,
  note,
  ...pages,
  project,
  publisher,
  shift,
  swal,
  user,
  users
}

export default it
