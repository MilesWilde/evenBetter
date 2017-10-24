import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class SportsDropdown extends Component {
  state = {
    value: 1,
    sport: '',
  };

  handleChange = (event, index, value) => this.setState({value});

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
      
    this.props.handleNext({
      sport: sport,
    });

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