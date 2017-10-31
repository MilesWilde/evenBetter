import React from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ChipInput from 'material-ui-chip-input'


class PossibleBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      error:'',
    };

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
  }

  handleChange(newData) {
    this.setState({value: newData})
  }

  handleMoveNext = () => {
    let error = ''
    if(this.state.value.length < 2) {
      error = 'There must be atleast 2 possibilities'
    }
    if (error.length === 0) {
      console.log("State value is: ", this.state.value)
      this.props.handleNext({
        possibilities: this.state.value
      })

      //Making the axios call to persist to db
      this.props.makeAxiosCall()
      
    } else {
      this.setState({error: error})
    }
  }

  render () {
    return (
      <div>
        <ChipInput
          floatingLabelText={"Enter the possibilities"}
          onChange={(chips) => this.handleChange(chips)}
          errorText = {this.state.error}
        /> <br /><br />

        <FlatButton
          label="Back"
          disabled={this.props.stepIndex === 0}
          onClick={this.props.handlePrev}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={this.props.stepIndex === 3 ? 'Finish' : 'Next'}
          primary={true}
          onClick={this.handleMoveNext}
        />
      </div>
    );
  }
}


export default PossibleBets;
