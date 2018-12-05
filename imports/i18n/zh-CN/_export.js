import dashboard from './dashboard'
import calendar from './calendar'
import error from './errors'
import framework from './framework'
import language from './language'
import shift from './shift'
import user from './user'

const zhCN = {
  calendar,
  dashboard,
  error,
  ...framework,
  language,
  shift,
  user
}

export default zhCN
