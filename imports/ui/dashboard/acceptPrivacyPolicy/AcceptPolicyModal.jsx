import React from 'react'
import i18next from 'i18next'

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
            <h2 className="modal-title">{i18next.t('dashboard.popUp.title')}</h2>
          </div>
          <div className="modal-body">
            <p>{i18next.t('dashboard.popUp.salutation')}</p>
            <p>{i18next.t('dashboard.popUp.p1')}</p>
            <p>{i18next.t('dashboard.popUp.p2')}</p>
            <h3>{i18next.t('dashboard.popUp.heading1')}</h3>
            <p dangerouslySetInnerHTML={ {__html: i18next.t('dashboard.popUp.p3')} }></p>
            <div dangerouslySetInnerHTML={ {__html: i18next.t('dashboard.popUp.list1')} }></div>
            <p dangerouslySetInnerHTML={ {__html: i18next.t('dashboard.popUp.p4')} }></p>
            <div dangerouslySetInnerHTML={ {__html: i18next.t('dashboard.popUp.list2')} }></div>
            <h3>{i18next.t('dashboard.popUp.heading2')}</h3>
            <p>{i18next.t('dashboard.popUp.p5')}</p>
            <h3>{i18next.t('dashboard.popUp.heading3')}</h3>
            <p>{i18next.t('dashboard.popUp.p6')}</p>
            <p dangerouslySetInnerHTML={ {__html: i18next.t('dashboard.popUp.ending')} }></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={accept}>{i18next.t('dashboard.popUp.accept')}</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={decline}>{i18next.t('dashboard.popUp.decline')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
