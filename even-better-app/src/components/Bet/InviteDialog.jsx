import React, {Component} from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List';

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

// Will need betID prop
class InviteDialog extends Component {
  state = {
    open: false,
    possibilities: [],
    selected: null
  };

  handleOpen = () => {
    this.setState({open: true});
    this.setBetOptions()
  };

  handleClose = () => {
    this.setState({open: false});
  };


  setBetOptions = () => {
    axios.get(`/api/v1/bets/${this.props.betID}/possibilities.json`, config)
    .then(response => {
      // Show bet options
      debugger
      this.setState( { possibilities: response.data })
      // Let user pick one
    })
    .catch(error => {
      console.log(error)
    } )
  }

  setFocus = (e) => {
    debugger
    e.target.setAtribute = ("focusState", "focused");
  }

 render() {
    const actions = [
      <FlatButton
        label="Decline"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Accept"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
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
             <MenuItem onClick={this.setFocus}>{option.description}</MenuItem>
            )
          })}
          </Dialog>
        </ MenuItem>
    );
  }
}

export default InviteDialog