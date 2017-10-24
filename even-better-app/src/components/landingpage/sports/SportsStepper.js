import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DateandSport from './sportsbetcontent/DateandSport';
import BetPoolandOutcome from './sportsbetcontent/BetPoolandOutcome';

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
        sport: ''
      }
    ]
  };

  handleNext = (userData) => {
    console.log('Im inside handlenext Sports')
    const {stepIndex, data} = this.state;
    const tempStateHold = data;

    if (stepIndex === 0) {
      tempStateHold[0] = {
        sport: userData.sport,
      }
    }
    if (stepIndex === 1) {
      tempStateHold[1] = {
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
      return <DateandSport  data={this.state.data[0]}
                            stepIndex={this.state.stepIndex}
                            />
      case 1:
        return 'Select from a list of games here';
      case 2:
        return <BetPoolandOutcome />
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
              You're all set! Confirm by hittin the PLACE BET! button
            </p>
          ) : (
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SportsStepper;