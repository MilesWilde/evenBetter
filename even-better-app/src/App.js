import React, { Component } from 'react'

import './App.css'
import UsersContainer from './components/UsersContainer'
import Main from './Main'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import SplashPage from './components/splashpage/SplashPage'

injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
 

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class App extends Component {
  render() {
    return (
 
      <MuiThemeProvider >
        <AppBar
          style={{position:'fixed'}}
          title='EvenBetter'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          iconElementRight={
            <div>
              <FlatButton label="Sign In" />
              <FlatButton label="Register" />
            </div>
          }
        />
        
        <SplashPage />
        <Main />
      </MuiThemeProvider>
    );
  }
}

export default App