import React, { Component } from 'react'

import './App.css'
import UsersContainer from './components/UsersContainer'
import Main from './Main'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar'

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
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