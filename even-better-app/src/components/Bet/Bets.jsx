import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Bet from './Bet'

class Bets extends Component {

  render() {
    return(
      <Switch>
        <Route path='/bets/:id' component={ Bet } />
      </Switch>
    )
  }
}

export default Bets
