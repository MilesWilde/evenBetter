import React, {Component} from 'react';
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
      accepted: null,
      fromUser: ''
    }
  }

  componentDidMount() {
    this.findBetCreator(this.props.bet.id)
      .then( username => {
        this.setState({fromUser: username})
      })
  }

 findBetCreator = (betID) => {
    return axios.get(`/api/v1/bets/${betID}/creator`, config)
    .then(response => {
      return response.data.username
    })
    .catch(error => {
      return error
    })
  // return name
  // render error page
  }

  openInviteDialog = (e) => {
    // Open Dialog Box
    return (
      <InviteDialog />
      )
  }


  render() {
    return (
      <div>
      <InviteDialog
        primaryText={"Invite from " + this.state.fromUser}
        bet={this.props.bet}
        loadInvites={this.props.loadInvites}
        loadBets={this.props.loadBets}
      />
      <Divider/>
      </div>
    )
  }
}

export default Invite;