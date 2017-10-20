import React, { Component } from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

class LandingPage extends Component {

  render() {
    return (
      <div>
        <MuiThemeProvider>
            <h1>Here will go the LANDING PAGE</h1>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage