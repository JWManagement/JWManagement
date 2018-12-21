import React from 'react'
import styled from 'styled-components'

const ShiftHeader = styled.div`
  width: 60px;
  height: 17px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.7);
`

const TeamHeader = styled.div`
  width: 80px;
  height: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: rgba(32, 41, 96, 0.4);
`

const Text = styled.div`
  width: 100px;
  height: 12px;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: rgba(32, 41, 96, 0.3);
`

export default function ShiftLoading () {
  return (
    <button className='btn btn-block shift'>
      <h3 className='shift-period'>
        <ShiftHeader />
      </h3>
      <div className='shift-teams'>
        <div className='shift-team'>
          <div className='shift-team-header'>
            <TeamHeader />
          </div>
          <div className='shift-team-participants'>
            <Text />
            <Text />
            <Text />
          </div>
        </div>
      </div>
    </button>
  )
}
