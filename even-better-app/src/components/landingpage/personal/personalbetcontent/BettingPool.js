import React from 'react';
import TextField from 'material-ui/TextField';
import DatePickerPopup from './DatePickerPopup'
import UsersAutoComplete from './UsersAutoComplete'
import MediatorAutoComplete from './MediatorAutoComplete'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


class BettingPool extends React.Component  {

    constructor(props) {
        super(props);
    
        this.state = {
            names: this.props.data.names,
            mediator: this.props.data.mediator,
            betDeadlineDate: this.props.data.betDeadlineDate,
            betDeadlineTime:this.props.data.betDeadlineTime,
            decisionDeadlineDate: this.props.data.decisionDeadlineDate,
            decisionDeadlineTime: this.props.data.decisionDeadlineTime,
            errors: []
        }
      }

    _handleUsersFieldChange = (e) => {
        this.setState({
            names: e.target.value
        });
      }
    
    _handleMediatorFieldChange = (e) => {
        this.setState({
            mediator: e.target.value
        });
      }

    handleMoveNext = () => {
        
            let errors = [];
            if (this.state.names.length === 0) {
              errors[0] = 'Must invite users to participate'
            }
            if (this.state.mediator === '') {
              errors[1] = 'Must have a mediator'
            }
            if (this.state.betDeadlineDate === '') {
              errors[2] = 'Must have a Bet Deadline Date'
            }
            if (this.state.betDeadlineTime=== '') {
              errors[3] = 'Must have a Bet Deadline Time'
            }
            if (this.state.decisionDeadlineTime=== '') {
              errors[4] = 'Must have a Decision Deadline Time'
            }
            if (this.state.decisionDeadlineTime=== '') {
              errors[5] = 'Must have a Decision Deadline Time'
            }
        
            if (errors.length === 0) {
         
              this.props.handleNext({
                names: this.state.names,
                mediator: this.state.mediator,
                betDeadlineDate: this.state.betDeadlineDate,
                betDeadlineTime: this.state.betDeadlineTime,
                decisionDeadlineDate: this.state.decisionDeadlineDate,
                decisionDeadlineTime: this.state.decisionDeadlineTime,
              });
            } else {
              this.setState({errors})
            }
          }
    
    render() {
        return (
            <div>
                <UsersAutoComplete names = {this.state.names} _handleUsersFieldChange = {this._handleUsersFieldChange} error = {this.state.errors[0]}/>
                <MediatorAutoComplete mediator = {this.state.mediator} _handleMediatorFieldChange = {this._handleMediatorFieldChange} error = {this.state.errors[1]}/>
            <br />
            <DatePickerPopup error = {this.state.errors[2]} />
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
                //Check e.target.vale of text field in <NameDesc /> for data. 
            />
            </div>
        );
    }
}


export default BettingPool;