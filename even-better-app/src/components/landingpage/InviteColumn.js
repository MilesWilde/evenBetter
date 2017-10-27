import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Invite from '../Bet/Invite'
import axios from 'axios'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

var config = {
  headers: {
    "Authorization": "Bearer " + window.localStorage.auth_token,
  }
}


// Finds the creator of a particular bet by ID
function findBetCreator(betID) {
  axios.get(`/api/v1/bets/${betID}`, config)
  .then(response => {
    return response
  })
  .catch(error => {
    return error
  })
  // render error page
}


// api call in componentdidmnt - sets state
// render function reads state

class InviteColumn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      invites: []
    }
  }

  loadInvites = () => {
    axios.get(`/api/v1/bets/invites.json`, config)
    .then(response => {
      console.log("Reloading Invites" + response.data)
      this.setState( { invites: response.data } )
      return null
    })
    .catch(error => {
      debugger
    })
  }

  componentDidMount() {
    this.loadInvites()
  }

  render () {
    return (
        <div class = "invite-column">
    <h3> Invite Column </h3>
    <Paper style={style}>
      <Menu desktop={true} width={320} maxHeight={250}>
        {this.state.invites.map((invite) => {
          return (<Invite
          betID={invite.id}
          betTitle={invite.title}
          loadInvites={this.loadInvites}
          />)
        })}
        {/*
        {this.state.invites.length > 0 &&
          <Invite betID={this.state.invites[0].id}
            betTitle={this.state.invites[0].title}
          />}
          */}
      </Menu>
    </Paper>
  </div>
  )
  }
}

export default InviteColumn;
