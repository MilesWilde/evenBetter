import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

import NameDesc from './personalbetcontent/NameDesc';
import BettingPool from './personalbetcontent/BettingPool'
import PossibleBets from './personalbetcontent/PossibleBets'
import ChoosePossibility from './personalbetcontent/ChoosePossibility'
import axios from 'axios';

import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class PersonalStepper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      data: [
        {
          name: '',
          description: ''
        },
        {
          names: [],
          mediator: {},
          betDeadlineDateTime: '',
          decisionDeadlineDateTime: '',
        },
        {
          possibilities:[]
        }
      ],
      sendPossibility:[]
    }
  }

  redirectToBet = (chosen) => {
    //Routing to the bets page
    this.props.history.push('/bets/' + chosen.bet_id)

  }

  makeAxiosCall = () => {

        const zerver = axios.create({
          baseURL: 'http://localhost:3001',
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.auth_token,
          }
        })

        let userIDArray = []
        this.state.data[1].names.forEach((name)=>{
          userIDArray.push(name.userId)
        });

        userIDArray.push(window.localStorage.user_id)

        return zerver.post('/api/v1/bets', {
          title: this.state.data[0].name ,
          description: this.state.data[0].description ,
          // pool: ((this.state.data[1].names.length)+1)*100,
          users: userIDArray,
          mediator_id: this.state.data[1].mediator.userId,
          betting_deadline: this.state.data[1].betDeadlineDateTime,
          outcome_deadline: this.state.data[1].decisionDeadlineDateTime,
          // creator_id: window.localStorage.user_id,
          // outcome_id: null,
          possibilities: this.state.data[2].possibilities
        })
        .then(response => {
        console.log("Response from post axios call", response)
          this.setState({sendPossibility: response.data.possibilities})
        });
      }

  handleNext = (userData) => {
    const {stepIndex, data} = this.state;
    const tempStateHold = data;

    if (stepIndex === 0) {
      tempStateHold[0] = {
        name: userData.name,
        description: userData.description
      }
    }
    if (stepIndex === 1) {
      tempStateHold[1] = {
        names: userData.names,
        mediator: userData.mediator,
        betDeadlineDateTime: userData.betDeadlineDateTime,
        decisionDeadlineDateTime: userData.decisionDeadlineDateTime,
      }
    }
    if (stepIndex === 2) {
      tempStateHold[2] = {
        possibilities: userData.possibilities
      }
    }

    if (stepIndex === 3) {
      tempStateHold[3] = {
        sendPossibility: userData.sendPossibility
      }
    }
    console.log("State at Personal Stepper: ", tempStateHold)
    this.setState({
      data: tempStateHold,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
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
      return <NameDesc        name={this.state.data[0].name}
                              description={this.state.data[0].description}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              data={this.state.data[0]}
                              stepIndex={stepIndex}
                              />
      case 1:
        return <BettingPool   handleNext={this.handleNext}
                              handlePrev={this.handlePrev}
                              data={this.state.data[1]}
                              stepIndex={stepIndex}

                              />
      case 2:
        return <PossibleBets  handleNext={this.handleNext}
                              handlePrev={this.handlePrev}
                              data={this.state.data[1]}
                              stepIndex={stepIndex}
                              possibilities={this.state.data[2].possibilities}
                              makeAxiosCall = {this.makeAxiosCall}
                              />
      case 3:
      if(this.state.sendPossibility.length > 0) {
      return <ChoosePossibility   handleNext={this.handleNext}
                                  handlePrev={this.handlePrev}
                                  data={this.state.data[2]}
                                  stepIndex={stepIndex}
                                  possibilities={this.state.data[2].possibilities}
                                  makeAxiosCall = {this.makeAxiosCall}
                                  sendPossibility = {this.state.sendPossibility}
                                  wait={3000}
                                  redirectToBet = {this.redirectToBet}
                             />
      }
      default:
        return '';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Define your bet</StepLabel>
          </Step>
          <Step>
            <StepLabel>Define betting pool</StepLabel>
          </Step>
          <Step>
            <StepLabel>Define the possibilities</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pick a choice</StepLabel>
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

export default withRouter(PersonalStepper);
