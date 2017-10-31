import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';


import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class SportsDropdown extends Component {
  state = {
    value: 1,
    sport: '',
    gameDate: ''
  };

  handleChange = (event, index, value) => this.setState({value});

  _handleGameDate = (e, gameDate) => {
    this.setState({gameDate: gameDate})
  }

  handleMoveNext = () => {
    let sport=''
    if(this.state.value === 1) {
      sport = 'NBA'
    }
    if(this.state.value === 2) {
      sport = 'NFL'
    }
    if(this.state.value === 3) {
      sport = 'MLB'
    }
    if(this.state.value === 4) {
      sport = 'EPL'
    }
    if(this.state.value === 5) {
      sport = 'MLS'
    }
    
    console.log("Setting the state for temphold here: ", this.state.gameDate)
    
    this.props.handleNext({
      sport: sport,
      gameDate: this.state.gameDate
    });

    //Getting a list of games for a given sport and date
    this.props._getGameList({
      sport: sport,
      gameDate: this.state.gameDate
    })

    console.log("State in sports dropdown: ", this.state.gameDate)

  }

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Pick a Sport"
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={true}
        >
          <MenuItem value={1} primaryText="NBA - Basketball" />
          <MenuItem value={2} primaryText="NFL - Football" />
          <MenuItem value={3} primaryText="MLB - Baseball" />
          <MenuItem value={4} primaryText="EPL - English Soccer" />
          <MenuItem value={5} primaryText="MLS - American Soccer" />
        </SelectField>
        <DatePicker   hintText="Date for game"
                      mode="landscape"
                      autoOk = {true}
                      onChange = {this._handleGameDate} />


        <FlatButton
                  label="Back"
                  disabled={this.props.stepIndex === 0}
                  onClick={this.props.handlePrev}
                  style={{marginRight: 12}}
        />
        <RaisedButton
          label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
          primary={true}
          onClick={this.handleMoveNext}
        />
      </div>
    );
  }
}