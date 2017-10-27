import React, { Component } from 'react'
import './css/LandingPage.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import InviteColumn from './InviteColumn'
import BetsColumn from './BetsColumn'
import PopupBets from './PopupBets'
import PointsColumn from './PointsColumn'
import ChangingProgressbar from './ChangingProgressbar'
import CircularProgressbar from 'react-circular-progressbar';
import Resource from '../../models/resource'

var pointsFunction = require('../landingpage/ranklogic')

const UserStore = Resource('users')


class LandingPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {}
    }
  }
  componentWillMount() {
    UserStore.find(window.localStorage.user_id)
      .then((response) => {
        this.setState({
          user: response
        })
      })
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div id = "stats">
              <h1>{this.state.user.first_name} {this.state.user.last_name} total points: {this.state.user.points}</h1>
              <h1>Next level: {pointsFunction.rankDetermine(this.state.user.points).nextLevel} points!</h1>
              <ChangingProgressbar percentages ={[0,pointsFunction.rankDetermine(this.state.user.points).percentageComplete]} />
            </div>
          </div>
          <div className=" create-bet-buttons container">
            <PopupBets />
          </div>
          <div className=" users-columns container">
            <div className = "left-column">
              <div className="invite-column"><InviteColumn /></div>
              <div className="points-column"><PointsColumn /></div>
            </div>
            <div className="bets-column"><BetsColumn /></div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage