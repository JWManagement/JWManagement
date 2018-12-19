import dashboard from './dashboard'
import framework from './framework'
import mail from './mail'
import misc from './misc'
import modal from './modals'
import navigation from './navigation'
import note from './notes'
import pages from './pages'
import project from './project'
import publisher from './publishers'
import store from './store'
import swal from './swals'

const fi = {
  dashboard,
  ...framework,
  mail,
  ...misc,
  modal,
  navigation,
  note,
  ...pages,
  project,
  publisher,
  store,
  swal
}

export default fi
