import React, { Component } from 'react'
import './css/LandingPage.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import InviteColumn from './InviteColumn'
import BetsColumn from './BetsColumn'
import PopupBets from './PopupBets'
import PointsColumn from './PointsColumn'


class LandingPage extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <h1>{window.localStorage.first_name} {window.localStorage.last_name} points: {window.localStorage.user_points}</h1>
          <div className=" create-bet-buttons container">
            <PopupBets />
          </div>
          <div className=" users-columns container">
            <div className = "left-column">
              <div className="invite-column"><InviteColumn /></div>
              <div className="points-column"><PointsColumn /></div>
            </div>
            <div className="bets-column"><BetsColumn /></div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage