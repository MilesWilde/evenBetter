import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

import { Switch, Route } from 'react-router-dom'
import UsersContainer from './components/UsersContainer'
import SplashPage from './components/splashpage/SplashPage'
import LandingPage from './components/landingpage/LandingPage'
import UserRegistration from './components/UserRegistration/UserRegistration'
import Leaderboard from './components/Leaderboard/Leaderboard'

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
  logOut(event){
    window.localStorage.clear()
    event.stopPropagation()
  }

  signOut(e){
    window.localStorage.clear()
    e.stopPropagation
  }


  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <MuiThemeProvider >
        <AppBar
          style={{position:'fixed', backgroundColor: '#263238'}}
          title={<Link to='/landing'>EvenBetter</Link>}
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          iconElementRight={
            window.localStorage.auth_token ?
            <div>
              <Link to='/landing'><FlatButton label="Home" /></Link>
              <Link to='/'><FlatButton label="About" /></Link>
              <Link to = '/'><FlatButton onClick = { this.signOut.bind(this) } label="Sign Out" /></Link>
            </div>
            :
            <div>
              <Link to='/auth/login'><FlatButton label="Sign In" /></Link>
              <Link to='/signup'><FlatButton label="Register" /></Link>
              <Link to='/'><FlatButton label="About" /></Link>
            </div>
          }
        />
        <div style={{ paddingTop: 64 }}></div>
        <main>
          <Switch>
            <Route exact path='/' component={SplashPage} />
            <Route path='/landing' component={LandingPage}/>
            <Route path='/signup' component={UserRegistration}/>
            <Route path='/bets/:id' component={ Bet } />
            <Route path='/auth/login' component={Login}/>
          </Switch>
        </main>
      </MuiThemeProvider>
    )
  }
}
export default App
