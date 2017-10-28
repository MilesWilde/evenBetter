import React, {Component} from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List';
import InvitePossibility from './InvitePossibility'

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

// Will need betID prop
class InviteDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      possibilities: [],
      selected: {}
    };
  }

  handleOpen = () => {
    this.setState({open: true});
    this.setBetOptions()
  };

  handleClose = () => {
    // Closes Invite dialog and refreshes Invites List
    this.setState({
      ...this.state,
      open: false,
      selected: {}
    });
    this.props.loadInvites()
    this.props.loadBets()
  };


  setBetOptions = () => {
    axios.get(`/api/v1/bets/${this.props.betID}/possibilities.json`, config)
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
    axios.patch(`/api/v1/bets_users/${this.props.betID}`, data, config)
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
    axios.patch(`/api/v1/bets_users/${this.props.betID}`, data, config)
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
        disabled={this.isEmpty(this.state.selected) ? true : false}
      />,
    ];

    return (
        <MenuItem primaryText={this.props.primaryText} onClick={this.handleOpen}>
          <Dialog
            title="Please Pick a Possibility and Accept, or Decline the Bet Invitation"
            autoScrollBodyContent = {true}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            actions={actions}
          >
          {this.state.possibilities.map((option) => {
            return (
             <InvitePossibility
             action={this.selectOption} option={option}/>
            )
          })}
          </Dialog>
        </ MenuItem>
    );
  }
}

export default InviteDialog