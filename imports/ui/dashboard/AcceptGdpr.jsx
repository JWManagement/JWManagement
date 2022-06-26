import React, { Component } from 'react'
import styled from 'styled-components'
import { Meteor } from 'meteor/meteor'


export default class AcceptGdpr extends Component {
  constructor() {
    super();

    let currentUser = Meteor.user();

    this.state = {
      show: !currentUser.profile.acceptedGdpr,
    };
  }

  FullscreenDiv = styled.div`
    width: 10000px;
    height: 10000px;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
    background-color: white;
    margin-top: 50px;
    padding: 100px;
  `

  accept = () => {
    Meteor.call('updateProfile', 'acceptedGdpr', true);
    this.setState({
      show: false,
    })
  }

  render () {
    const FullscreenDiv = this.FullscreenDiv;

    return this.state.show && (
      <FullscreenDiv>
        <div>
          <p>Bitte bestätigen sie, dass Sie die Datenschutz-Erklärungen zur Kenntnis genommen haben und diesen zustimmen.</p>
          <button onClick={this.accept}>Ich bestätige dies.</button>
        </div>
      </FullscreenDiv>
    )
  }
}