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

  componentDidMount() {
    axios.get(`/api/v1/bets/invites.json`, config)
    .then(response => {
      console.log(response)
      this.setState( { invites: response.data } )
      return null
    })
    .catch(error => {
      console.log(error)
    })
  }

  render () {
    return (
        <div className = "invite-column">
    <h3> Invite Column </h3>
    <Paper style={style}>
      <Menu desktop={true} width={320} maxHeight={250}>
        {this.state.invites.map((invite) => {
          return (<Invite
          betID={invite.id}
          betTitle={invite.title}
          fromUser={findBetCreator(invite.id)}
          />)
        })}
      </Menu>
    </Paper>
  </div>
  )
  }
}

export default InviteColumn;
