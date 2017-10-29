import React, {Component} from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List';
import MediationRequestPossibility from './MediationRequestPossibility'
import moment from 'moment'

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

// Gets bet prop
class MediationRequestDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      possibilities: [],
      selected: {},
      // currentTime: Date().getTime()
    };
  }

  handleOpen = () => {
    this.setState({open: true});
    this.setBetOptions()
  };

  handleClose = () => {
    // Closes MediationRequest dialog and refreshes MediationRequests List
    this.setState({
      ...this.state,
      open: false,
      selected: {}
    });
    this.props.loadMediationRequests()
    this.props.loadBets()
  };


  setBetOptions = () => {
    axios.get(`/api/v1/bets/${this.props.bet.id}/possibilities.json`, config)
    .then(response => {
      // Show bet options
      this.setState( { possibilities: response.data })
      // Let user pick one
    })
    .catch(error => {
      console.log(error)
    } )
  }

  selectOption = (option) => {
    console.log("Option")
    console.log(option)
    this.setState({
      ...this.state,
      selected: option
    })
  }

  handleAccept = (e) => {
    // Update bet_user - has_accepted to true
    var data = {
      has_accepted: true,
      possibility_id: this.state.selected.id
    }
    axios.patch(`/api/v1/bets_users/${this.props.bet.id}`, data, config)
    .then(response => {
      console.log("Response: ")
      console.log(response.data)
      this.handleClose()
    })
    .catch(error => {
      console.log("Error: " + error)
    })

  }

  handleDecline = (e) => {
    // Update bet_user - has_accepted to false
    var data = { has_accepted: false }
    axios.patch(`/api/v1/bets_users/${this.props.bet.id}`, data, config)
    .then(response => {
      console.log("Response: " + response)
      this.handleClose()
    })
    .catch(error => {
      console.log("Error: " + error)
    })
  }

  // Utility function to check for empty object
  isEmpty = (obj) => {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

 render() {
    const actions = [
      <FlatButton
        label="Decline"
        primary={true}
        onClick={this.handleDecline}
      />,
      <FlatButton
        label="Accept"
        primary={true}
        onClick={this.handleAccept}

      />,
    ];

    return (
        <MenuItem primaryText={this.props.primaryText} onClick={this.handleOpen}>
          <Dialog
            title={this.props.bet.title}
            autoScrollBodyContent = {true}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            actions={actions}
          >
          {this.state.possibilities.map((option) => {
            return (
             <MediationRequestPossibility
             action={this.selectOption} option={option}/>
            )
          })}
          </Dialog>
        </ MenuItem>
    );
  }
}

export default MediationRequestDialog