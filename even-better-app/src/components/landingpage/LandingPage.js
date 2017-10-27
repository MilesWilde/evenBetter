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
import axios from 'axios'

var pointsFunction = require('../landingpage/ranklogic')

const UserStore = Resource('users')

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      invites: [],
      bets: [],
      refreshCount: 0
    }
  }

  getMainState = () => {
    return this.state
  }

  loadInvites = () => {
    axios.get(`/api/v1/bets/invites.json`, config)
    .then(response => {
      console.log("Reloading Invites" + response.data)
      this.setState({
        ...this.state,
        invites: response.data
      })
      return null
    })
    .catch(error => {
      console.log("Error in invites", error)
    })
  }

  loadBets = () => {
    axios.get(`/api/v1/bets/acceptances.json`, config)
    .then(response => {
      console.log("Reloading Acceptances" + response.data)
      this.setState({
        ...this.state,
        bets: response.data
      })
      return null
    })
    .catch(error => {
      console.log("Error in Acceptances", error)
    })
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
  refreshAction = () => {
    this.forceUpdate()
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div id = "stats">
              <h1>{this.state.user.first_name} {this.state.user.last_name} total points: {this.state.user.points}</h1>
              <h1>Next level: {pointsFunction.rankDetermine(this.state.user.points).nextLevel} points!</h1>
              <ChangingProgressbar
                user={this.state.user}
                percentages ={[0,pointsFunction.rankDetermine(this.state.user.points).percentageComplete]}
              />
            </div>
          </div>
          <div className=" create-bet-buttons container">
            <PopupBets />
          </div>
          <div className=" users-columns container">
            <div className = "left-column">
              <div className="invite-column">
              <InviteColumn
                getMainState={this.getMainState}
                loadInvites={this.loadInvites}
                loadBets={this.loadBets}/>
              </div>
              <div className="points-column"><PointsColumn user={this.state.user}/></div>
            </div>
            <div className="bets-column">
            <BetsColumn
            user={this.state.user}
            getMainState={this.getMainState}
            loadBets={this.loadBets}/>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default LandingPage