import React from 'react';
import TextField from 'material-ui/TextField';
import UsersCompleteSports from './UsersCompleteSports'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class BetPoolandOutcome extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            names: this.props.data.names,
            value: 1,
            possibilities: '',
            errors: []
        }
    }
    handleChange = (event, index, value) => this.setState({value});

    _handleUsersFieldChange = (names) => {
        console.log("PARTICIPANT VALUE IS", names)
        this.setState({
            names: names
        });
    }

    handleMoveNext = () => {
        let error = ''
        if(this.state.names.length === 0) {
          error = 'Must have users to bet against'
        }

        if (error.length === 0) {
          console.log("State value is: ", this.state.value)
        
          let sendPossibilities = ''
          if(this.state.value === 1) {
              sendPossibilities = 'Team A wins'
          }
          if(this.state.value === 2) {
            sendPossibilities = 'Tie Game'
          }
          if(this.state.value === 3) {
            sendPossibilities = 'Team B wins'
          }

          console.log("Possibility: ", this.state.possibilities)
          this.props.handleNext({
            names: this.state.names,
            value: this.state.value,
            possibilities: sendPossibilities
          })
          this.setState({possibilities: sendPossibilities})

        } else {
          this.setState({error: error})
        }
    }


    render() {
        return(
            <div>
                <UsersCompleteSports    _handleUsersFieldChange={this._handleUsersFieldChange}
                                        error = {this.state.error}/>
            <br />
            <h4> Define the possibilities </h4>
            <div>
                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="Team A beats Team B" />
                <MenuItem value={2} primaryText="Tie Game" />
                <MenuItem value={3} primaryText="Team B beats Team A" />
                </DropDownMenu>
                <br />
            </div>
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

export default BetPoolandOutcome;