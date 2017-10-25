import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './components/landingpage/LandingPage'
import UserRegistration from './components/UserRegistration/UserRegistration'
import Login from './components/Login/Login'
import SplashPage from './components/splashpage/SplashPage'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route path='/landing' component={LandingPage}/>
    </Switch>
    <Switch>
      <Route path='/signup' component={UserRegistration}/>
    </Switch>
    <Switch>
      <Route path='/auth/login' component={Login}/>
    </Switch>
    <Switch>
      <Route exact path='/' component={SplashPage}/>
    </Switch>
    </main>
)

export default Main