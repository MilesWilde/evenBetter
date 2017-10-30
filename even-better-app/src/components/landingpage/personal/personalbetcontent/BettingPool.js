import React from 'react';
import TextField from 'material-ui/TextField';
import DatePickerPopup from './DatePickerPopup'
import UsersAutoComplete from './UsersAutoComplete'
import MediatorAutoComplete from './MediatorAutoComplete'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Resource from '../../../../models/resource'
const UserCompleteStore = Resource('users')


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
            errors: [],
            usersList:[]
        }
    }

    componentWillMount(){
        
        var listofUsers = [];
        UserCompleteStore.findAll()
        .then((result) => {
            result.map((user) => {    
                listofUsers.push(user.username)
            })
            this.setState({
                usersList: listofUsers
            })
        })
        .catch((errors) => console.log("PERSONAL AXIOS CALL", errors))
    }

    _handleUsersFieldChange = (names) => {
        this.setState({
            names: names
        });
      }
    
    _handleMediatorFieldChange = (names) => {
        this.setState({
            mediator: names
        });
      }


    _handleChangeBetDeadline = (e) => {
        console.log("Bet Deadline Date is: ", e)
        this.setState({
            betDeadlineDate: e
        });
    }

    _handleChangeBetTime = (e) => {
        console.log("Bet Deadline Time is: ", e)
        this.setState({
            betDeadlineTime: e
        });
    }

    _handleChangeDecisionDeadline = (e) => {
        console.log("Decision Deadline Date is: ", e)
        this.setState({
            decisionDeadlineDate: e
        });
    }

    _handleChangeDecisionTime = (e) => {
        console.log("Decision Deadline Time is: ", e)
        this.setState({
            decisionDeadlineTime: e
        });
    }

    handleMoveNext = () => {
            let errors = [];
            console.log(errors)
            if (this.state.names.length === 0) {
              errors[0] = 'Must invite users to participate'
            }
            if (this.state.mediator === '') {
              errors[1] = 'Must have a mediator'
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
                <UsersAutoComplete  usersList = {this.state.usersList} 
                                    names = {this.state.names} 
                                    _handleUsersFieldChange = {this._handleUsersFieldChange} 
                                    error = {this.state.errors[0]}/>

                <MediatorAutoComplete   usersList = {this.state.usersList} 
                                        mediator = {this.state.mediator} 
                                        _handleMediatorFieldChange = {this._handleMediatorFieldChange} 
                                        error = {this.state.errors[1]}/>
            <br />
            <DatePickerPopup 
                dateProp={this.state}
                _handleChangeBetDeadline = {this._handleChangeBetDeadline}
                _handleChangeBetTime = {this._handleChangeBetTime}
                _handleChangeDecisionDeadline = {this._handleChangeDecisionDeadline}
                _handleChangeDecisionTime = {this._handleChangeDecisionTime}
                />
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


export default BettingPool;