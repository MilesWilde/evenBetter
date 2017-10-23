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
      name: '',
      description: '',
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
      errors.push('name cannot be blank.')
    }
    if (this.state.description === '') {
      errors.push('description cannot be blank.')
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
            errorText="This field is required"/>
          <br />
          <TextField 
            value={this.state.description} 
            onChange={this._handleDescFieldChange}
            floatingLabelText="Describe your bet"
            errorText="This field is required"
            multiLine={true}
            rows={2}
            rowsMax={4}/>
          <br />
        </div>
        <div style={{marginTop: 12}}>

        <FlatButton
          label="Back"
          onClick={this.handlePrev}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={this.props.stepIndex === 2 ? 'Finish' : 'Next'}
          primary={true}
          onClick={this.handleMoveNext}
          //Check e.target.vale of text field in <NameDesc /> for data. 
        />
        </div>
      </div>
     
    );
  }
}

export default NameDesc;