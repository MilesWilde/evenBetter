import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

import { Switch, Route, Redirect } from 'react-router-dom'
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
      currentUser: null
    }
  }

  logOut(event){
    window.localStorage.clear()
    this.setState({ ...this.state, currentUser: null })
    event.stopPropagation()
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      currentUser: window.localStorage.user_id || null
    })
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
            </div>
            :
            <div>
              <Link to='/login'><FlatButton label="Sign In" /></Link>
              <Link to='/signup'><FlatButton label="Register" /></Link>
              <Link to='/'><FlatButton label="About" /></Link>
            </div>
          }
        />
        <div style={{ paddingTop: 64 }}></div>
        <main>
          <Switch>
            <Route exact path='/' component={SplashPage} />
            <Route path='/signup' component={UserRegistration}/>
            <Route path='/login' component={Login}/>
            <PrivateRoute path='/landing' currentUser={ this.state.currentUser } component={LandingPage}/>
            <PrivateRoute path='/bets/:id' currentUser={ this.state.currentUser } component={ Bet } />
          </Switch>
        </main>
      </MuiThemeProvider>
    )
  }
}
export default App
