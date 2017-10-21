import React, { Component } from 'react'
import './LandingPage.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import InviteColumn from './InviteColumn'
import PointsColumn from './PointsColumn'
import BetsColumn from './BetsColumn'
import Buttons from './Buttons'


class LandingPage extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div class=" create-bet-buttons container">
            <Buttons />
          </div>
          <div class=" users-columns container">
            <div class="column-center"><InviteColumn /></div>
            <div class="column-left"><BetsColumn /></div>
            <div class="column-right"><PointsColumn /></div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage