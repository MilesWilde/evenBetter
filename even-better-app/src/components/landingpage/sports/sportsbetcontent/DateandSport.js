import React from 'react';
import SportsDropdown from './SportsDropdown';

class DateandSport extends React.Component {
  state = {
    sportsData: this.props.data,
    sportsStepIndex: this.props.stepIndex,
    sportsHandleNext: this.props.handleNext,
    sportsHandlePrev: this.props.handlePrev
  };

  render() {
    return (
    <div>

      <SportsDropdown data={this.state.sportsData}
                      stepIndex={this.state.sportsStepIndex}
                      handleNext={this.state.sportsHandleNext}
                      handlePrev={this.state.sportsHandlePrev}
                      />
      <br />
    </div>
    );
  }
}

  
  export default DateandSport;
  