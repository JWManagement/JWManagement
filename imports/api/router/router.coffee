import './main.coffee'
import './projects.coffee'
import './policies.coffee'

FlowRouter.notFound = action: -> BlazeLayout.render 'blankLayout', content: 'notFound'
