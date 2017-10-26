import React from 'react';
import SportsDropdown from './SportsDropdown';

class DateandSport extends React.Component {
  state = {
    sportsData: this.props.data,
    sportsStepIndex: this.props.stepIndex,
    sportsHandleNext: this.props.handleNext,
    sportsHandlePrev: this.props.handlePrev
  };

  _getGameList = (dataAboutSport) =>{
    console.log("Sportsdata inside state is: ", dataAboutSport.sport, dataAboutSport.gameDate)
    
  }

  render() {
    return (
    <div>

      <SportsDropdown data={this.state.sportsData}
                      stepIndex={this.state.sportsStepIndex}
                      handleNext={this.state.sportsHandleNext}
                      handlePrev={this.state.sportsHandlePrev}
                      _getGameList={this._getGameList}
                      />
      <br />
    </div>
    );
  }
}

  
  export default DateandSport;
  