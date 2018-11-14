import React from 'react'

function ShiftLoading () {
  return (
    <button className='btn btn-block shift fake-shift'>
      <h3 className='shift-period'>
        <div className='fake-header' />
      </h3>
      <div className='shift-teams'>
        <div className='shift-team'>
          <div className='shift-team-header'>
            <div className='fake-team-header' />
          </div>
          <div className='shift-team-participants'>
            <div className='fake-text' />
            <div className='fake-text' />
            <div className='fake-text' />
          </div>
        </div>
      </div>
    </button>
  )
}

export default ShiftLoading
