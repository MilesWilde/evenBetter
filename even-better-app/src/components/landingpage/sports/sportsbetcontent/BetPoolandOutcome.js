import React from 'react';
import TextField from 'material-ui/TextField';
import UsersCompleteSports from './UsersCompleteSports'

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Resource from '../../../../models/resource'
const UserCompleteStore = Resource('users')


class BetPoolandOutcome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            names: this.props.data.names,
            value: 1,
            chosenWinner: '',
            errors: [],
            usersList: []
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
        .catch((errors) => console.log("AXIOS CALL", errors))
    }


    handleChange = (event, index, value) => this.setState({value});

    _handleUsersFieldChange = (names) => {
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

          let sendchosenWinner = ''
          if(this.state.value === 1) {
              sendchosenWinner = this.props.homeTeam
          }
          if(this.state.value === 2) {
            sendchosenWinner = 'Tie Game'
          }
          if(this.state.value === 3) {
            sendchosenWinner = this.props.awayTeam
          }

          this.setState({chosenWinner: sendchosenWinner})

        console.log("Possibility: ", sendchosenWinner)
          this.props.handleNext({
              names: this.state.names,
              value: this.state.value,
              chosenWinner: sendchosenWinner
            })

            //Making the axios call to persist to db
        this.props.makeAxiosCall()
        // this.props.redirectToBet(sendchosenWinner)
            
        } else {
          this.setState({error: error})
        }

    }


    render() {
        return(
            <div>
                <UsersCompleteSports    _handleUsersFieldChange={this._handleUsersFieldChange}
                                        error = {this.state.error}
                                        usersList = {this.state.usersList}/>
            <br />
            <h4> Pick a winner </h4>
            <div>
                {
                <DropDownMenu value={this.state.value} onChange={this.handleChange} style={{ borderBottom: 'solid 1px #C5C5C5'}}>
                    <MenuItem value={1} primaryText= {this.props.homeTeam}/>
                    <MenuItem value={2} primaryText="Tie Game" />
                    <MenuItem value={3} primaryText={this.props.awayTeam}/>
                </DropDownMenu>
                }
                <br />
            </div>
                <FlatButton
                    label="Back"
                    disabled={this.props.stepIndex === 0}
                    onClick={this.props.handlePrev}
                    style={{marginRight: 12}}
                />
                <RaisedButton
                    label={this.props.stepIndex === 2 ? 'Place bet' : 'Next'}
                    primary={true}
                    onClick={this.handleMoveNext}
                />
            </div>
        );
    }
}

export default BetPoolandOutcome;
