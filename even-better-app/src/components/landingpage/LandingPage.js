import React, { Component } from 'react'
import './css/LandingPage.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import InviteColumn from './InviteColumn'
import BetsColumn from './BetsColumn'
import PopupBets from './PopupBets'


class LandingPage extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div className=" create-bet-buttons container">
            <PopupBets />
          </div>
          <div className=" users-columns container">
            <div className="invite-column  column-left"><InviteColumn /></div>
            <div className="bets-column column-center"><BetsColumn /></div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage