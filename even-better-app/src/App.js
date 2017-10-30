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

// Material UI
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
};

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
      navMenuOpen: false
    }
  }

  logOut(event){
    window.localStorage.clear()
    this.setState({ ...this.state, currentUser: null })
    event.stopPropagation()
  }

  handleLoginSuccess = (userId) => {
    this.setState({
      ...this.state,
      currentUser: userId
    })
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      currentUser: Number(window.localStorage.user_id) || null
    })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <MuiThemeProvider>
        <NavBar currentUser={ this.state.currentUser } handleLogout = {this.logOut} handleNavMenuOpen={ this.handleNavMenuOpen } />
        <div style={{ paddingTop: 64 }}></div>
        <main>
          <Switch>
            <Route exact path='/' component={SplashPage} />
            <Route path='/signup' component={UserRegistration}/>
            <Route path='/leaderboard' component={Leaderboard}/>
            <Route path='/login'
              render={(props) => <Login {...props} handleLoginSuccess={ this.handleLoginSuccess }/>}
            />
            <PrivateRoute path='/home' currentUser={ this.state.currentUser } component={LandingPage}/>
            <PrivateRoute path='/bets/:id' currentUser={ this.state.currentUser } component={ Bet } />
            <Route component={ NotFound } />
          </Switch>
        </main>
      </MuiThemeProvider>
    )
  }
}
export default App
