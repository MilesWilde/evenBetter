import CircularProgressbar from 'react-circular-progressbar';
import React, { Component } from 'react'
import './css/LandingPage.css';

var pointsFunction = require('./ranklogic')

class ChangingProgressbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPercentageIndex: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        currentPercentageIndex: (this.state.currentPercentageIndex + 1) % this.props.percentages.length
      });
    }, this.props.interval);
  }
  render() {
    return <CircularProgressbar
      {...this.props} 
      percentage={this.props.percentages[this.state.currentPercentageIndex]}
      textForPercentage={(percentage) => `${pointsFunction.rankDetermine(window.localStorage.user_points).pointsToNext} to go!`}
       />;
  }
}


ChangingProgressbar.defaultProps = {
  interval: 1000,
}

export default ChangingProgressbar;