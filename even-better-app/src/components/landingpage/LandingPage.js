import React, { Component } from 'react'
import './css/LandingPage.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import InviteColumn from './InviteColumn'
import PointsColumn from './PointsColumn'
import BetsColumn from './BetsColumn'
import Buttons from './Buttons'
import PopupBets from './PopupBets'


class LandingPage extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className=" create-bet-buttons container">
            <Buttons 
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}
            />
          </div>
          <div className=" create-bet-buttons container">
            <PopupBets />
          </div>
          <div className=" users-columns container">
            <div className="invite-column column-center"><InviteColumn /></div>
            <div className="bets-column column-left"><BetsColumn /></div>
            <div className="points-column column-right"><PointsColumn /></div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage