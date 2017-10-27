import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import InviteDialog from './InviteDialog'

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

// Needs 2 props: betID, betTitle, betUserID

class Invite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      betID: this.props.betID,
      accepted: null,
      fromUser: ''
    }
  }

  componentDidMount() {
    this.findBetCreator(this.props.betID)
      .then( username => {
        this.setState({fromUser: username})
      })
  }

 findBetCreator = (betID) => {
    return axios.get(`/api/v1/bets/${betID}/creator`, config)
    .then(response => {
      debugger
      return response.data.username
    })
    .catch(error => {
      debugger
      return error
    })
  // return name
  // render error page
  }

  onAccept = (e) => {
    // Update bet_user - has_accepted to true
    var data = { has_accepted: true }
    axios.patch(`/api/v1/bets_users/${this.props.betID}`, data, config)
    .then(response => {
      console.log("Response: " + response)
      this.props.action()
    })
    .catch(error => {
      console.log("Error: " + error)
    })


  }

  openInviteDialog = (e) => {
    // Open Dialog Box
    debugger
    return (
      <InviteDialog />
      )
  }


  render() {
    return (
      <div>
      <MenuItem>
      <InviteDialog primaryText={"Invite from " + this.state.fromUser} betID={this.props.betID}/>
      </MenuItem>
      <Divider/>
      </div>
    )
  }
}

export default Invite;