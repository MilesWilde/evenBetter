import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'
import UsersContainer from './components/UsersContainer'
import Main from './Main'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import SplashPage from './components/splashpage/SplashPage'
import FlatButton from 'material-ui/FlatButton';

injectTapEventPlugin();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941



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
              <Link to={'/landing'}><FlatButton label="Home" /></Link>
              <Link to={'/signin'}><FlatButton label="Sign In" /></Link>
              <Link to={'/signup'}><FlatButton label="Register" /></Link>
            </div>
          }
        />
        
        <Main />
      </MuiThemeProvider>
    );
  }
}

export default App