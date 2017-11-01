import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import SplashPage from './components/splashpage/SplashPage'
import LandingPage from './components/landingpage/LandingPage'
import UserRegistration from './components/UserRegistration/UserRegistration'

import Bet from './components/Bet/Bet'
import Login from './components/Login/Login'
import Leaderboard from './components/Leaderboard/Leaderboard'

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route {...rest} render={props => (
    currentUser ? (
      <Component currentUser={ currentUser }{...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      currentUser: null,
      currentUsername: null,
      navMenuOpen: false
    }
  }

  logOut(event){
    window.localStorage.clear()
    this.setState({ ...this.state, currentUser: null })
    event.stopPropagation()
  }

  handleLoginSuccess = (userId, username) => {
    this.setState({
      ...this.state,
      currentUser: userId,
      currentUsername: username
    })
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      currentUser: Number(window.localStorage.user_id) || null,
      currentUsername: window.localStorage.username || null
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar
            currentUser={ this.state.currentUser }
            currentUsername={ this.state.currentUsername }
            handleLogout = {this.logOut}
            handleNavMenuOpen={ this.handleNavMenuOpen }
          />
          <div style={{ paddingTop: 64 }}></div>
          <main>
            <Switch>
              <PrivateRoute exact path='/' currentUser={ this.state.currentUser } component={LandingPage} />
              <Route path='/signup' component={UserRegistration}/>
              <Route path='/login'
                render={(props) => <Login {...props} handleLoginSuccess={ this.handleLoginSuccess }/>}
              />
              <PrivateRoute path='/home' currentUser={ this.state.currentUser } component={LandingPage}/>
              <PrivateRoute path='/bets/:id' currentUser={ this.state.currentUser } component={ Bet } />
              <PrivateRoute path='/leaderboard' currentUser={ this.state.currentUser } component={Leaderboard}/>
              <Route component={ NotFound } />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default App
