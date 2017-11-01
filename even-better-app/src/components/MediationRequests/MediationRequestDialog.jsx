import React, {Component} from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

  handleAccept = (e) => {
    // Update bet_user - has_accepted to true
    var data = {
      has_accepted: true
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
        <RaisedButton
        fullWidth={true}
        onClick={this.handleOpen}
        backgroundColor="#B0C4DE"
        ><div className="text-center"><strong>{this.props.primaryText}</strong></div>
          <Dialog
            title={'Mediation Request: ' + this.props.bet.title}
            autoScrollBodyContent = {true}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            actions={actions}
          >
          </Dialog>
        </ RaisedButton>
    );
  }
}

export default MediationRequestDialog
