import React from 'react'

export default () => {
  function accept() {
    Meteor.call('user.acceptPrivacyPolicy')
  }

  function decline() {
    Meteor.logout()
  }

  return (
    <div id="acceptPolicy" data-backdrop="static" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Modal title</h2>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={accept}>Accept</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={decline}>Decline</button>
          </div>
        </div>
      </div>
    </div>
  )
}
