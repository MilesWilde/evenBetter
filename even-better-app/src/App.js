import React, { Component } from 'react'

import './App.css'
import UsersContainer from './components/UsersContainer'
import Main from './Main'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider >
        <AppBar
            title="EvenBetter"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Main />
      </MuiThemeProvider>
    );
  }
}

export default App