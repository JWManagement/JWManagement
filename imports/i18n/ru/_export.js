import authentication from './authentication'
import dashboard from './dashboard'
import error from './errors'
import framework from './framework'
import language from './language'
import mail from './mail'
import misc from './misc'
import modal from './modals'
import navigation from './navigation'
import pages from './pages'
import store from './store'
import swal from './swals'

const ru = {
  ...authentication,
  dashboard,
  error,
  ...framework,
  language,
  mail,
  ...misc,
  modal,
  navigation,
  ...pages,
  store,
  swal
}

export default ru
