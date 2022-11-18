import authentication from './authentication'
import dashboard from './dashboard'
import calendar from './calendar'
import error from './errors'
import framework from './framework'
import language from './language'
import mail from './mail'
import misc from './misc'
import modal from './modals'
import navigation from './navigation'
import pages from './pages'
import project from './project'
import publisher from './publishers'
import shift from './shift'
import swal from './swals'
import user from './user'
import users from './users'
import vessel from './vessels'

const de = {
  ...authentication,
  calendar,
  dashboard,
  error,
  ...framework,
  language,
  mail,
  ...misc,
  modal,
  navigation,
  ...pages,
  project,
  publisher,
  shift,
  swal,
  user,
  users,
  vessel
}

export default de
