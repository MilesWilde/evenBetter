import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import NameDesc from './personalbetcontent/NameDesc';
import BettingPool from './personalbetcontent/BettingPool'
import PossibleBets from './personalbetcontent/PossibleBets'
import axios from 'axios';

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
          betDeadlineDate: null,
          betDeadlineTime:null,
          decisionDeadlineDate: null,
          decisionDeadlineTime:null        
        },
        {
          possibilities:[]
        }
      ]
    }
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
    
        zerver.post('/api/v1/bets', {
          title: this.state.data[0].name ,
          description: this.state.data[0].description ,
          pool: ((this.state.data[1].names.length)+1)*100,
          users: userIDArray,
          mediator_id: this.state.data[1].mediator.userId,
          bettingDeadline: this.state.data[1].betDeadlineDate,
          outcomeDeadline: this.state.data[1].decisionDeadlineDate,
          creator_id: window.localStorage.user_id,
          created_at: "2017-10-25 22:41:29.403225",
          updated_at: "2017-10-25 22:41:29.403225",
          outcome_id: null,
          possibilities: this.state.data[2].possibilities
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
        betDeadlineDate: userData.betDeadlineDate,
        betDeadlineTime: userData.betDeadlineTime,
        decisionDeadlineDate: userData.decisionDeadlineDate,
        decisionDeadlineTime: userData.decisionDeadlineTime,
      }
    }
    if (stepIndex === 2) {
      tempStateHold[2] = {
        possibilities: userData.possibilities
      }
    }
    console.log("TempstateHold", tempStateHold)
    this.setState({
      data: tempStateHold,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
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
      default:
        return 'Come on, make a Personal Bet!!';
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

export default PersonalStepper;