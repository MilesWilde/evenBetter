import React, { Component } from 'react'

import './App.css'
import UsersContainer from './components/UsersContainer'
import Main from './Main'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton';
import Cable from 'actioncable';

injectTapEventPlugin();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941


class App extends Component {
  render() {
    return (

      <MuiThemeProvider >
        {/* <AppBar
          style={{position:'fixed'}}
          title='EvenBetter'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          iconElementRight={
            <div>
              <FlatButton label="Sign In" />
              <FlatButton label="Register" />
            </div>
          }
        /> */}

        <Main />
      </MuiThemeProvider>
    );
  }

}

export default App
