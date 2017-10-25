import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

import { Switch, Route } from 'react-router-dom'
import UsersContainer from './components/UsersContainer'
import SplashPage from './components/splashpage/SplashPage'
import LandingPage from './components/landingpage/LandingPage'
import UserRegistration from './components/UserRegistration/UserRegistration'
import Bet from './components/Bet/Bet'
import Login from './components/Login/Login'

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
<<<<<<< HEAD
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
        <div style={{ paddingTop: 64 }}></div>
        <main>
          <Switch>
            <Route exact path='/' component={SplashPage} />
            <Route path='/landing' component={LandingPage}/>
            <Route path='/signup' component={UserRegistration}/>
            <Route path='/bets' component={Bet}/>
            <Route path='/auth/login' component={Login}/>
          </Switch>
        </main>
      </MuiThemeProvider>
    );
=======
    if(window.localStorage.auth_token)
      return (
        <MuiThemeProvider >
          <div className="topDiv">
            <AppBar
              style={{position:'fixed'}}
              title={<Link to="/landing">EvenBetter</Link>}
              iconClassNameRight='muidocs-icon-navigation-expand-more'
              iconElementRight={
                <div>
                  <Link to="/landing"><FlatButton label="Home" /></Link>
                  <Link to="/"><FlatButton label="About" /></Link>
                </div>
              }
            />
          </div>
          <Main />
        </MuiThemeProvider>
      );
    else {
      return (
        <MuiThemeProvider >
          <div className="topDiv">
            <AppBar
              style={{position:'fixed'}}
              title={<Link to="/">EvenBetter</Link>}
              iconClassNameRight='muidocs-icon-navigation-expand-more'
              iconElementRight={
                <div>
                  <Link to="/auth/login"><FlatButton label="Sign In" /></Link>
                  <Link to="/signup"><FlatButton label="Register" /></Link>
                  <Link to="/"><FlatButton label="About" /></Link>
                </div>
              }
            />
          </div>
          <Main />
        </MuiThemeProvider>
      );
    }
>>>>>>> 0281f6af09948c3b46208f4e23369356f0661ff0
  }

}

export default App
