import React, {Component} from 'react';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import axios from 'axios'

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}

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
    this.findBetCreator(this.state.betID)
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


    // Remove from parent state
  }

  render() {
    return (
      <div>
      <MenuItem
        primaryText={"Invite from " + this.state.fromUser}
        rightIcon={<ArrowDropRight />}
        style={{whiteSpace: 'normal'}}
        desktop="true"
        menuItems={[
          <MenuItem primaryText="Accept" />,
          <MenuItem primaryText="Decline" />,
        ]}
      />
      <Divider/>
      </div>
    )
  }
}

export default Invite;