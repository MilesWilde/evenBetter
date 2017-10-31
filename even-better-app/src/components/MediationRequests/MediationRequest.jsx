import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import MediationRequestDialog from './MediationRequestDialog'



var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

// Needs 2 props: betID, betTitle, betUserID

class MediationRequest extends Component {

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



  openMediationRequestDialog = (e) => {
    // Open Dialog Box
    return (
      <MediationRequestDialog />
      )
  }


  render() {
    return (
      <div>
      <MediationRequestDialog
        primaryText={"Mediation Request from " + this.state.fromUser}
        bet={this.props.bet}
        loadMediationRequests={this.props.loadMediationRequests}
        loadBets={this.props.loadBets}
      />
      </div>
    )
  }
}

export default MediationRequest;
