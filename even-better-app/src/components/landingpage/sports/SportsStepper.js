import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import DateandSport from './sportsbetcontent/DateandSport';
import BetPoolandOutcome from './sportsbetcontent/BetPoolandOutcome';
import GamesList from './sportsbetcontent/GamesList';
import axios from 'axios';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
var moment = require('moment');
var betId;

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class SportsStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    data: [
      {
        sport: '',
        gameDate: ''
      },
      {
        homeTeam: '',
        awayTeam: '',
        gameCode: ''
      },
      {
        names: [],
        value: null,
        chosenWinner: ''
      }
    ],
    betId: null,
    creatorPossId: null
  };

  redirectToBet = () => {
    //Routing to the bets page
    this.props.history.push('/bets/' + betId)
  }

  makeAxiosCall = () => {
      console.log("Stateee iin sportsss isss: ", this.state)

    const zerver = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.auth_token,
      }
    })
    let userIDArray = []
    this.state.data[2].names.forEach((name)=>{
      userIDArray.push(name.userId)
    });

    userIDArray.push(window.localStorage.user_id)
    const momentDate = moment(this.state.data[0].gameDate).add(1, 'days').format()

    zerver.post('/api/v1/bets', {
      title: `${this.state.data[1].homeTeam} vs. ${this.state.data[1].awayTeam}` ,
      pool: ((this.state.data[2].names.length)+1)*100,
      users: userIDArray,
      game_date: this.state.data[0].gameDate,
      game_type: this.state.data[0].sport,
      game_code: this.state.data[1].gameCode,
      creator_id: window.localStorage.user_id,
      betting_deadline: momentDate,
      outcome_deadline: momentDate,
      outcome_id: null,
      possibilities: [this.state.data[1].homeTeam, "Tie Game", this.state.data[1].awayTeam]
    }).then(res => {
                    betId = res.data.possibilities[0].bet_id
                    // this.setState({betId:betId})
                    let creatorPossId = null
                    res.data.possibilities.forEach((poss) => {
                      if(this.state.data[2].chosenWinner == poss.description) {
                        creatorPossId = poss.id
                      }
                      console.log("Possibility ID: ", creatorPossId)
                    })
                    this.setState({ betId: betId,
                                    creatorPossId: creatorPossId})
                    }
      ).then(res => {
        var data = {
          has_accepted: true,
          possibility_id: this.state.creatorPossId
        }
        axios.patch(`/api/v1/bets_users/${this.state.betId}`, data, config)
        .then(response => {
          console.log("Response from sports patch: ")
          console.log(response.data)
          this.redirectToBet()          
        })
        .catch(error => {
          console.log("Error: " + error)
        })
      });

    } //End of makeAxiosCall()




  handleNext = (userData) => {
    const {stepIndex, data} = this.state;
    const tempStateHold = data;

    if (stepIndex === 0) {
      tempStateHold[0] = {
        sport: userData.sport,
        gameDate: userData.gameDate
      }
    }
    if (stepIndex === 1) {
      tempStateHold[1] = {
        homeTeam: userData.homeTeam,
        awayTeam: userData.awayTeam,
        gameCode: userData.gameCode
      }
    }
    if (stepIndex === 2) {
      tempStateHold[2] = {
        names: userData.names,
        value: userData.value,
        chosenWinner: userData.chosenWinner
      }
    }

    this.setState({
      data: tempStateHold,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
    console.log("State of Sports Stepper: ", tempStateHold)
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      return <DateandSport  data={this.state.data[0]}
                            stepIndex={this.state.stepIndex}
                            handleNext={this.handleNext}
                            />
      case 1:
        return <GamesList   data={this.state.data[0]}
                            stepIndex={this.state.stepIndex}
                            handlePrev={this.handlePrev}
                            handleNext={this.handleNext}
                            />
      case 2:
        return <BetPoolandOutcome data={this.state.data[2]}
                                  stepIndex={this.state.stepIndex}
                                  handlePrev={this.handlePrev}
                                  handleNext={this.handleNext}
                                  homeTeam={this.state.data[1].homeTeam}
                                  awayTeam={this.state.data[1].awayTeam}
                                  makeAxiosCall = {this.makeAxiosCall}
                                  redirectToBet = {this.redirectToBet}
                                  />
      default:
        return 'Come on, make a Sports Bet!!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Pick Sports and Date</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pick a game</StepLabel>
          </Step>
          <Step>
            <StepLabel>Betting Pool and Outcome</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              Your bet has been placed! Good luck!
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SportsStepper);
