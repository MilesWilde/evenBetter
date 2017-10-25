import React from 'react';
import TextField from 'material-ui/TextField';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class NameDesc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      description: this.props.description,
      errors: []
    }
  }

  _handleNameFieldChange = (e) => {
    this.setState({
        name: e.target.value
    });
  }

  _handleDescFieldChange = (e) => {
    this.setState({
        description: e.target.value
    });
  }

  handleMoveNext = () => {

    let errors = [];
    if (this.state.name === '') {
      errors[0] = 'name cannot be blank.'
    }
    if (this.state.description === '') {
      errors[1] = 'description cannot be blank.'
    }

    if (errors.length === 0) {
 
      this.props.handleNext({
        name: this.state.name,
        description: this.state.description
      });
    } else {
      this.setState({errors})
    }
  }

  render() {
    return (
      <div>
        <div>
          <TextField 
            value={this.state.name} 
            onChange={this._handleNameFieldChange}
            floatingLabelText="Name your bet"
            errorText = {this.state.errors[0]} />
          <br />
          <TextField 
            value={this.state.description} 
            onChange={this._handleDescFieldChange}
            floatingLabelText="Describe your bet"
            errorText={this.state.errors[1]} 
            multiLine={true}
            rows={2}
            rowsMax={4}/>
          <br />
        </div>
        <div style={{marginTop: 12}}>

        <FlatButton
          label="Back"
          disabled={this.props.stepIndex === 0}
          onClick={this.props.handlePrev}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
          primary={true}
          onClick={this.handleMoveNext}          //Check e.target.vale of text field in <NameDesc /> for data. 
        />
        </div>
      </div>
     
    );
  }
}

export default NameDesc;